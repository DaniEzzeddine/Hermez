#!/usr/bin/python
import MySQLdb
import json
from parse_json import parse_json
db = MySQLdb.connect("localhost", "root", "daserik20", "students")
curs = db.cursor()
sql = "INSERT INTO logins(url, login, user_id) VALUES (%s, %s, %s)"
curs.execute("DROP TABLE logins;CREATE TABLE logins(uid INT(8) AUTO_INCREMENT PRIMARY KEY, url VARCHAR(100) UNIQUE NOT NULL, login VARCHAR(20) UNIQUE NOT NULL, user_id INT(12));")
with open('students.json', 'r') as f:
    students = json.load(f)
for student in students :
    val = (student['url'], student['login'], student['id'])
    curs.execute(sql, val)
db.commit()
db.close()
curs.close()