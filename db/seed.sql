INSERT INTO department (name) VALUES
 ('Sales'), 
 ('Engineering'), 
 ('Fianance');

 INSERT INTO role (title, salary, department_id) VALUES 
('Sales Manager', 80000, 1), 
('Software Engineer', 120000, 2), 
('Accountant', 1250000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('Jane', 'Doe', 1, NULL), 
('Joe', 'Thompson', 3, 1), 
('Mike', 'Fields', 2, NULL);