-- ═══════════════════════════════════════════════════════════════════════════
--  Smart Parking System — Demo Seed Data
--  Run this AFTER the application starts once (tables auto-created by JPA).
--  Passwords are BCrypt encoded — plain-text equivalent shown in comments.
-- ═══════════════════════════════════════════════════════════════════════════

USE smart_parking_db;

-- ─────────────────────────────────────────────────────────────────────────────
--  1. USERS  (2 Admins + 5 Regular Users)
--  All passwords = admin password (admin accounts) or user password (user accounts)
-- ─────────────────────────────────────────────────────────────────────────────
INSERT INTO users (full_name, email, password, role) VALUES
-- Admins  (password: Admin@123)
('System Administrator', 'admin@smartpark.com',
 '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iAt6deme', 'ADMIN'),
('Parking Manager',      'manager@smartpark.com',
 '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iAt6deme', 'ADMIN'),

-- Regular Users  (password: User@1234)
('Rahul Sharma',   'rahul.sharma@gmail.com',
 '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'USER'),
('Priya Patel',    'priya.patel@gmail.com',
 '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'USER'),
('Arjun Mehta',    'arjun.mehta@gmail.com',
 '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'USER'),
('Sneha Iyer',     'sneha.iyer@gmail.com',
 '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'USER'),
('Vikram Singh',   'vikram.singh@gmail.com',
 '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'USER');

-- ─────────────────────────────────────────────────────────────────────────────
--  2. PARKING SLOTS  (50 Slots: 20 CAR + 20 BIKE + 10 SUV)
-- ─────────────────────────────────────────────────────────────────────────────
INSERT INTO parking_slots (slot_number, slot_type, occupied) VALUES
-- CAR slots (C-01 to C-20)
('C-01','CAR',false),('C-02','CAR',false),('C-03','CAR',false),('C-04','CAR',false),
('C-05','CAR',false),('C-06','CAR',false),('C-07','CAR',false),('C-08','CAR',false),
('C-09','CAR',false),('C-10','CAR',false),('C-11','CAR',false),('C-12','CAR',false),
('C-13','CAR',false),('C-14','CAR',false),('C-15','CAR',false),('C-16','CAR',false),
('C-17','CAR',false),('C-18','CAR',false),('C-19','CAR',false),('C-20','CAR',false),
-- BIKE slots (B-01 to B-20)
('B-01','BIKE',false),('B-02','BIKE',false),('B-03','BIKE',false),('B-04','BIKE',false),
('B-05','BIKE',false),('B-06','BIKE',false),('B-07','BIKE',false),('B-08','BIKE',false),
('B-09','BIKE',false),('B-10','BIKE',false),('B-11','BIKE',false),('B-12','BIKE',false),
('B-13','BIKE',false),('B-14','BIKE',false),('B-15','BIKE',false),('B-16','BIKE',false),
('B-17','BIKE',false),('B-18','BIKE',false),('B-19','BIKE',false),('B-20','BIKE',false),
-- SUV slots (S-01 to S-10)
('S-01','SUV',false),('S-02','SUV',false),('S-03','SUV',false),('S-04','SUV',false),
('S-05','SUV',false),('S-06','SUV',false),('S-07','SUV',false),('S-08','SUV',false),
('S-09','SUV',false),('S-10','SUV',false);

-- ─────────────────────────────────────────────────────────────────────────────
--  3. VEHICLES  (20 vehicles across all types)
-- ─────────────────────────────────────────────────────────────────────────────
INSERT INTO vehicles (vehicle_number, vehicle_type, owner_name, owner_mobile) VALUES
-- Cars
('MH12AB1234','CAR','Rahul Sharma',    '9876543210'),
('DL5SX9876', 'CAR','Anita Desai',     '9812345678'),
('KA03MN5678','CAR','Suresh Kumar',    '9900112233'),
('GJ01BC3456','CAR','Pooja Nair',      '9988776655'),
('TN09CD7890','CAR','Karthik Rajan',   '9123456789'),
('MH04EF2345','CAR','Meera Joshi',     '9811223344'),
('UP32GH6789','CAR','Amit Verma',      '9765432109'),
('RJ14IJ4567','CAR','Sunita Kumari',   '9654321098'),
-- Bikes
('MH12XY1111','BIKE','Priya Patel',    '9345678901'),
('DL8AB2222', 'BIKE','Rohan Das',      '9234567890'),
('KA05CD3333','BIKE','Lakshmi Reddy',  '9123450987'),
('GJ07EF4444','BIKE','Nikhil Shah',    '9012345678'),
('TN11GH5555','BIKE','Divya Krishnan', '8901234567'),
('MH20IJ6666','BIKE','Aakash Gupta',   '8890123456'),
('UP15KL7777','BIKE','Rekha Mishra',   '8779012345'),
-- SUVs
('MH01PQ8888','SUV','Vikram Singh',    '8668901234'),
('DL3RS9999', 'SUV','Neha Kapoor',     '8557890123'),
('KA10TU1010','SUV','Rajesh Pillai',   '8446789012'),
('GJ15VW2020','SUV','Kavya Menon',     '8335678901'),
('TN20XY3030','SUV','Sanjay Bhat',     '8224567890');

-- ─────────────────────────────────────────────────────────────────────────────
--  4. PARKING RECORDS  (Historical completed records — random vehicles/slots)
--  All records are completed (exitTime and parkingFee set).
--  Fees: CAR=₹30/hr, BIKE=₹15/hr, SUV=₹50/hr (adjust to match your service)
-- ─────────────────────────────────────────────────────────────────────────────
INSERT INTO parking_records (vehicle_id, slot_id, entry_time, exit_time, parking_fee) VALUES
-- Car records (slot_type=CAR, vehicle_id 1–8, slot_id 1–20)
(1,  1,  '2024-06-01 08:00:00', '2024-06-01 10:30:00', 75.00),
(2,  2,  '2024-06-01 09:15:00', '2024-06-01 12:00:00', 82.50),
(3,  3,  '2024-06-02 07:30:00', '2024-06-02 09:00:00', 45.00),
(4,  4,  '2024-06-02 10:00:00', '2024-06-02 14:30:00', 135.00),
(5,  5,  '2024-06-03 08:45:00', '2024-06-03 11:15:00', 75.00),
(6,  6,  '2024-06-03 13:00:00', '2024-06-03 16:00:00', 90.00),
(7,  7,  '2024-06-04 09:00:00', '2024-06-04 10:00:00', 30.00),
(8,  8,  '2024-06-04 11:00:00', '2024-06-04 15:00:00', 120.00),
-- Bike records (slot_type=BIKE, vehicle_id 9–15, slot_id 21–40)
(9,  21, '2024-06-05 08:00:00', '2024-06-05 10:00:00', 30.00),
(10, 22, '2024-06-05 09:30:00', '2024-06-05 11:30:00', 30.00),
(11, 23, '2024-06-06 07:00:00', '2024-06-06 09:00:00', 30.00),
(12, 24, '2024-06-06 12:00:00', '2024-06-06 14:30:00', 37.50),
(13, 25, '2024-06-07 10:00:00', '2024-06-07 12:00:00', 30.00),
(14, 26, '2024-06-07 08:00:00', '2024-06-07 11:00:00', 45.00),
(15, 27, '2024-06-08 09:00:00', '2024-06-08 10:00:00', 15.00),
-- SUV records (slot_type=SUV, vehicle_id 16–20, slot_id 41–50)
(16, 41, '2024-06-09 08:00:00', '2024-06-09 12:00:00', 200.00),
(17, 42, '2024-06-09 10:00:00', '2024-06-09 14:00:00', 200.00),
(18, 43, '2024-06-10 09:00:00', '2024-06-10 11:00:00', 100.00),
(19, 44, '2024-06-10 13:00:00', '2024-06-10 18:00:00', 250.00),
(20, 45, '2024-06-11 08:30:00', '2024-06-11 12:30:00', 200.00),
-- Recent records (last 7 days to make dashboard look alive)
(1,  9,  NOW() - INTERVAL 6 DAY,  NOW() - INTERVAL 6 DAY + INTERVAL 2 HOUR,  60.00),
(3,  10, NOW() - INTERVAL 5 DAY,  NOW() - INTERVAL 5 DAY + INTERVAL 3 HOUR,  90.00),
(9,  28, NOW() - INTERVAL 4 DAY,  NOW() - INTERVAL 4 DAY + INTERVAL 1 HOUR,  15.00),
(16, 46, NOW() - INTERVAL 3 DAY,  NOW() - INTERVAL 3 DAY + INTERVAL 4 HOUR, 200.00),
(5,  11, NOW() - INTERVAL 2 DAY,  NOW() - INTERVAL 2 DAY + INTERVAL 2 HOUR,  60.00),
(12, 29, NOW() - INTERVAL 1 DAY,  NOW() - INTERVAL 1 DAY + INTERVAL 3 HOUR,  45.00),
(2,  12, NOW() - INTERVAL 12 HOUR, NOW() - INTERVAL 10 HOUR,                  60.00),
(18, 47, NOW() - INTERVAL 6 HOUR,  NOW() - INTERVAL 4 HOUR,                  100.00);

-- ─────────────────────────────────────────────────────────────────────────────
--  5. CONTACT MESSAGES
-- ─────────────────────────────────────────────────────────────────────────────
INSERT INTO contact_messages (name, email, subject, message, created_at, resolved)
VALUES
('Rahul Sharma',  'rahul.sharma@gmail.com',  'Parking fee query',
 'Hi, I wanted to ask about the hourly rate for SUV parking. Could you please clarify?',
 NOW() - INTERVAL 3 DAY, false),
('Priya Patel',   'priya.patel@gmail.com',   'Receipt not generated',
 'My parking session ended but I did not receive a receipt. Please help.',
 NOW() - INTERVAL 2 DAY, false),
('Anita Desai',   'anita.desai@gmail.com',   'Account registration issue',
 'I am unable to register. The form keeps showing a validation error.',
 NOW() - INTERVAL 1 DAY, true),
('Vikram Singh',  'vikram.singh@gmail.com',  'Slot availability question',
 'Is there a way to reserve a slot in advance? I drive an SUV.',
 NOW() - INTERVAL 5 HOUR, false);

-- ─────────────────────────────────────────────────────────────────────────────
-- VERIFICATION — Run these to confirm row counts
-- ─────────────────────────────────────────────────────────────────────────────
-- SELECT 'Users'           AS table_name, COUNT(*) AS row_count FROM users
-- UNION ALL
-- SELECT 'Parking Slots',                 COUNT(*)              FROM parking_slots
-- UNION ALL
-- SELECT 'Vehicles',                      COUNT(*)              FROM vehicles
-- UNION ALL
-- SELECT 'Parking Records',               COUNT(*)              FROM parking_records
-- UNION ALL
-- SELECT 'Contact Messages',              COUNT(*)              FROM contact_messages;
