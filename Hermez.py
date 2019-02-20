#!/usr/bin/python
from flask import Flask,jsonify, render_template, request
from werkzeug.datastructures import ImmutableMultiDict
from werkzeug.utils import secure_filename
from flask_mail import Message,  Mail
from PIL import Image
import pytesseract
import MySQLdb
import smtplib
import json
import os

#   SSL Settings
# context = SSL.Context(SSL.SSLv23_METHOD)
# context.use_privatekey_file('host.key')
# context.use_certificate_file('host.crt')




#  Configure application
application = Flask(__name__, template_folder="build/")
application.config['UPLOAD_FOLDER'] = 'uploads/'
application.config['ALLOWED_EXTENSIONS'] = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])
application.config.update(
	MAIL_SERVER='smtp.gmail.com',
	MAIL_PORT=465,
	MAIL_USE_SSL=True,
	MAIL_USERNAME = os.getenv('mail_username'),
	MAIL_PASSWORD = os.getenv('mail_password')
	)


# List of allowed file-extensions
def allowed_file(filename):
    return '.' in filename and  filename.rsplit('.', 1)[1] in application.config['ALLOWED_EXTENSIONS']






@application.route('/')
def index():
        return render_template("index.html")







#Mail route, sending mail to all recipients from table recipients
@application.route("/sendmail", methods=['GET'])
def send_mail() :
        db = MySQLdb.connect(os.getenv('mysql_host'), os.getenv('mysql_username'), os.getenv('mysql_password'), os.getenv('mysql_database'))
        curs = db.cursor()
        # mail = Mail(application)
        # curs.execute("SELECT * FROM recipients;")
        # try :
        #         # for recipient in curs.fetchall():
        #         #         msg = Message("mailmailmailmail",
	#         #         	        sender="dani.izzedin@gmail.com",
	#         #         	        recipients=["{}@42.us.org".format(recipient[1])])
	#         #         msg.body = "Hello, this msg was sended from flask by web-application Hermez, you got mail, pick it up at the bocal tomorrow"           
	#         #         # mail.send(msg)
        # except Exception as e:
        #         return str(e)
        # finally:
        curs.execute("DELETE FROM recipients WHERE intraname LIKE '%%';")
        db.commit()
        curs.close()
        db.close()
        
        return "Mail sended"



#Getting image from the page, saving it, printing text on image
@application.route('/upload', methods=['POST'])
def upload():
    file = request.files['file']
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(application.config['UPLOAD_FOLDER'], filename))
        print(pytesseract.image_to_string(Image.open('uploads/test_image1.png')))
	return jsonify({'status':'OK'})




#Route for getting new recipient, basic checks if login already in the table, checking for any errors with mysql
@application.route('/insertrecipient', methods=['GET'])
def insertrecipient():
        db = MySQLdb.connect(os.getenv('mysql_host'), os.getenv('mysql_username'), os.getenv('mysql_password'), os.getenv('mysql_database'))
        curs = db.cursor()
        input=request.args['input']
        print "input = ", input
        try :
                print "Start"
                curs.execute("SELECT COUNT(1) FROM recipients WHERE intraname LIKE '{}';".format(input))
                if curs.fetchone()[0]:
                        print ("User already exist")
                        return ("User already exist")
                try :
                        curs.execute("INSERT INTO recipients(intraname) VALUES('{}');".format(input))
                        print("Adding student")
                except MySQLdb.Error, e :
                        try:
                                print "MySQL Error [%d]: %s" % (e.args[0], e.args[1])
                        except IndexError:
                                print "MySQL Error: %s" % str(e)
                        return None
                finally:
                        db.commit()
                        print "gottie"
                        curs.close()
                        db.close()
        except ValueError:
                return "Something went wrong"
        finally:
                return "User added :)"
        return "super"




#Route for deliting recipient
@application.route('/deleterecipient', methods=['GET'])
def deleterecipient():
        db = MySQLdb.connect(os.getenv('mysql_host'), os.getenv('mysql_username'), os.getenv('mysql_password'), os.getenv('mysql_database'))
        curs = db.cursor()
        input=request.args['input']
        print input
        try :
                print "here"
                curs.execute("DELETE FROM recipients WHERE intraname LIKE '{}';".format(input))
                db.commit()
        finally:
                curs.close()
                db.close()
                return "done!"





#changing intraname of the recipient
@application.route('/changerecipient', methods=['GET'])
def changerecipient():
        db = MySQLdb.connect(os.getenv('mysql_host'), os.getenv('mysql_username'), os.getenv('mysql_password'), os.getenv('mysql_database'))
        curs = db.cursor()
        old_name=request.args['old_value']
        new_name=request.args['new_value']
        print old_name, new_name
        try :
                print "here"
                curs.execute("UPDATE recipients SET intraname ='{}' WHERE intraname = '{}';".format(new_name, old_name))
                db.commit()
        finally:
                curs.close()
                db.close()
                return "done!"







@application.route('/getrecipients', methods=['GET'])
def getrecipients():
        db = MySQLdb.connect(os.getenv('mysql_host'), os.getenv('mysql_username'), os.getenv('mysql_password'), os.getenv('mysql_database'))
        curs = db.cursor()
        try :
                print "here"
                curs.execute("SELECT * FROM recipients;")
                result = curs.fetchall()
        finally:
                curs.close()
                db.close()
                return json.dumps({"data" : result})








@application.route('/autocomplete', methods=['GET'])
def autocomplete():
        db = MySQLdb.connect(os.getenv('mysql_host'), os.getenv('mysql_username'), os.getenv('mysql_password'), os.getenv('mysql_database'))
        curs = db.cursor()
        input=request.args['input']
        print input
        try :
                curs.execute("SELECT * FROM logins WHERE login LIKE '%{}%';".format(input))
        finally:
                result = curs.fetchall()
                curs.close()
                db.close()
        return json.dumps({"data":result[:15]})

if __name__ == '__main__':
        application.run(host='0.0.0.0')
        # context = ('host.crt', 'host.key')
