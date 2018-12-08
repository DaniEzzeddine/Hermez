import json
def parse_json():
    with open('students.json', 'r') as f:
        students = json.load(f)
    students_login = []
    for student in students:
        students_login.append(student['login'])
    return students_login