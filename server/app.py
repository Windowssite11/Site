from flask import Flask, request, jsonify, send_from_directory
from flask_mail import Mail, Message
from flask_cors import CORS
from dotenv import load_dotenv
from datetime import datetime
import os

# Загрузка переменных окружения
load_dotenv()

# Инициализация приложения
app = Flask(__name__, static_folder='../client/build')

# Настройка логирования

# Конфигурация почты
app.config.update(
    MAIL_SERVER='smtp.gmail.com',
    MAIL_PORT=465,
    MAIL_USE_SSL=True,
    MAIL_USERNAME=os.getenv('MAIL_USERNAME'),
    MAIL_PASSWORD=os.getenv('MAIL_PASSWORD'),
    MAIL_DEFAULT_SENDER=os.getenv('MAIL_DEFAULT_SENDER')
)

# Инициализация расширений
mail = Mail(app)
CORS(app)


# Пути к статическим файлам
client_folder = os.path.abspath(os.path.join(os.getcwd(), "..", "client"))
build_folder = os.path.join(client_folder, "build")

@app.route('/api/submit-form', methods=['POST'])
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
        if not app.config['MAIL_USERNAME'] or not app.config['MAIL_PASSWORD']:
            return jsonify({'success': False, 'error': 'Server configuration error'}), 500

        # Отправка email
        msg = Message(
            subject='Новая заявка на замер',
            recipients=[os.getenv('TARGET_EMAIL', app.config['MAIL_DEFAULT_SENDER'])],
            body=f"Телефон: {phone}\nДата: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
        )
        
        mail.send(msg)
        return jsonify({'success': True, 'message': 'Email sent successfully'})
        
    except Exception as e:
        return jsonify({'success': False, 'error': 'Internal server error'}), 500
    
@app.route('/api/submit', methods=['POST'])
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
        if not app.config['MAIL_USERNAME'] or not app.config['MAIL_PASSWORD']:
            return jsonify({'success': False, 'error': 'Server configuration error'}), 500

        # Отправка email
        msg = Message(
            subject='Новая заявка на расчет стоимости',
            recipients=[os.getenv('TARGET_EMAIL', app.config['MAIL_DEFAULT_SENDER'])],
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

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    """Обработчик статических файлов для React"""
    if path != "" and os.path.exists(os.path.join(build_folder, path)):
        return send_from_directory(build_folder, path)
    return send_from_directory(build_folder, 'index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=os.getenv('FLASK_DEBUG', 'False') == 'True')