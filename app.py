from flask import Flask, request, jsonify, send_from_directory
from flask_mail import Mail, Message
from flask_cors import CORS
from dotenv import load_dotenv
from datetime import datetime
import os

# Загрузка переменных окружения
load_dotenv()

# Инициализация приложения
application = Flask(__name__, static_folder='client/build')

# Настройка логирования

# Конфигурация почты
application.config.update(
    MAIL_SERVER='smtp.gmail.com',
    MAIL_PORT=465,
    MAIL_USE_SSL=True,
    MAIL_USERNAME=os.getenv('MAIL_USERNAME'),
    MAIL_PASSWORD=os.getenv('MAIL_PASSWORD'),
    MAIL_DEFAULT_SENDER=os.getenv('MAIL_DEFAULT_SENDER')
)

# Инициализация расширений
mail = Mail(application)
CORS(application)


# Пути к статическим файлам
client_folder = os.path.abspath(os.path.join(os.getcwd(), "client"))
build_folder = os.path.join(client_folder, "build")

@application.route('/api/submit-form', methods=['POST'])
def submit_form():
    """Обработчик формы"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'success': False, 'error': 'No data provided'}), 400
            
        phone = data.get('phone')
        
        if not phone:
            return jsonify({'success': False, 'error': 'Phone number is required'}), 400
        
        # Проверка конфигурации почты
        if not application.config['MAIL_USERNAME'] or not application.config['MAIL_PASSWORD']:
            return jsonify({'success': False, 'error': 'Server configuration error'}), 500

        # Отправка email
        msg = Message(
            subject='Новая заявка на замер',
            recipients=[os.getenv('TARGET_EMAIL', application.config['MAIL_DEFAULT_SENDER'])],
            body=f"Телефон: {phone}\nДата: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
        )
        
        mail.send(msg)
        return jsonify({'success': True, 'message': 'Email sent successfully'})
        
    except Exception as e:
        return jsonify({'success': False, 'error': 'Internal server error'}), 500
    
@application.route('/api/submit', methods=['POST'])
def submit():
    """Обработчик формы"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'success': False, 'error': 'No data provided'}), 400
            
        phone = data.get('phone')
        name = data.get('name', 'Не указано')
        product = data.get('product', 'Не указано')
        
        if not phone:
            return jsonify({'success': False, 'error': 'Phone number is required'}), 400
        
        # Проверка конфигурации почты
        if not application.config['MAIL_USERNAME'] or not application.config['MAIL_PASSWORD']:
            return jsonify({'success': False, 'error': 'Server configuration error'}), 500

        # Отправка email
        msg = Message(
            subject='Новая заявка на расчет стоимости',
            recipients=[os.getenv('TARGET_EMAIL', application.config['MAIL_DEFAULT_SENDER'])],
            body=f"""
            Продукт: {product}
            Имя: {name}
            Телефон: {phone}
            Дата: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
            """
        )
        
        mail.send(msg)
        return jsonify({'success': True, 'message': 'Email sent successfully'})
        
    except Exception as e:
        return jsonify({'success': False, 'error': 'Internal server error'}), 500
    
@application.route('/api/submit-window-request', methods=['POST'])
def submit_window_request():
    """Обработчик заявки на окна с полными данными"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'success': False, 'error': 'No data provided'}), 400
            
        # Обязательные поля
        required_fields = ['name', 'phone', 'size']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'success': False, 'error': f'Field {field} is required'}), 400
        
        # Проверка конфигурации почты
        if not application.config['MAIL_USERNAME'] or not application.config['MAIL_PASSWORD']:
            return jsonify({'success': False, 'error': 'Server configuration error'}), 500

        # Формирование содержимого письма
        email_body = f"""
        <h2>Новая заявка на оконные изделия</h2>
        <p><strong>Дата:</strong> {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</p>
        <p><strong>Имя:</strong> {data.get('name')}</p>
        <p><strong>Телефон:</strong> {data.get('phone')}</p>
        <p><strong>Email:</strong> {data.get('email', 'не указан')}</p>
        <p><strong>Выбранный размер:</strong> {data.get('size')}</p>
        <p><strong>Ширина:</strong> {data.get('width', 'не указана')} см</p>
        <p><strong>Высота:</strong> {data.get('height', 'не указана')} см</p>
        <p><strong>Дополнительная информация:</strong></p>
        <p>{data.get('message', 'нет дополнительной информации')}</p>
        <hr>
        <p>Это письмо было отправлено автоматически, пожалуйста, не отвечайте на него.</p>
        """

        # Отправка email
        msg = Message(
            subject=f'Новая заявка на окна от {data.get("name")}',
            recipients=[os.getenv('TARGET_EMAIL', application.config['MAIL_DEFAULT_SENDER'])],
            html=email_body
        )
        
        mail.send(msg)
        
        # Логирование успешной отправки
        application.logger.info(f"Window request submitted: {data.get('name')}, {data.get('phone')}")
        
        return jsonify({
            'success': True, 
            'message': 'Заявка успешно отправлена!'
        })
        
    except Exception as e:
        # Логирование ошибки
        application.logger.error(f"Error submitting window request: {str(e)}")
        return jsonify({
            'success': False, 
            'error': 'Internal server error',
            'details': str(e)
        }), 500
    
@application.route('/api/submit-repair', methods=['POST'])
def submit_repair():
    """Обработчик заявок на ремонт окон"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'success': False, 'error': 'No data provided'}), 400
            
        required_fields = ['name', 'phone', 'service']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'success': False, 'error': f'Field {field} is required'}), 400

        email_body = f"""
        <h2>Новая заявка на ремонт окон</h2>
        <p><strong>Дата:</strong> {data.get('date')}</p>
        <p><strong>Тип ремонта:</strong> {data.get('service')}</p>
        <p><strong>Имя клиента:</strong> {data.get('name')}</p>
        <p><strong>Телефон:</strong> {data.get('phone')}</p>
        <p><strong>Email:</strong> {data.get('email', 'не указан')}</p>
        <p><strong>Описание проблемы:</strong></p>
        <p>{data.get('message', 'не указано')}</p>
        <hr>
        <p>Это письмо было отправлено автоматически.</p>
        """

        msg = Message(
            subject=f'Заявка на ремонт: {data.get("service")}',
            recipients=[os.getenv('TARGET_EMAIL', application.config['MAIL_DEFAULT_SENDER'])],
            html=email_body
        )
        
        mail.send(msg)
        
        return jsonify({
            'success': True, 
            'message': 'Repair request submitted successfully'
        })
        
    except Exception as e:
        return jsonify({
            'success': False, 
            'error': 'Internal server error',
            'details': str(e)
        }), 500

@application.route('/', defaults={'path': ''})
@application.route('/<path:path>')
def serve(path):
    """Обработчик статических файлов для React"""
    if path != "" and os.path.exists(os.path.join(build_folder, path)):
        return send_from_directory(build_folder, path)
    return send_from_directory(build_folder, 'index.html')

if __name__ == '__main__':
    application.run(host='0.0.0.0', port=5000, debug=os.getenv('FLASK_DEBUG', 'False') == 'True')