import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { connectDB } from '../config/db.js';
import mongoose from 'mongoose';
import User from '../models/User.js';
import Event from '../models/Event.js';
import Assignment from '../models/Assignment.js';
import Note from '../models/Note.js';

const STUDENTS = [
  {
    username: 'CS1042',
    password: 'campus1042',
    name: 'Alex Rivera',
    studentId: 'CS1042',
    department: 'Computer Science',
    year: '3rd Year',
    email: 'alex.rivera@campushub.edu',
    phone: '555-0142',
    skills: ['React', 'Python', 'UI Design'],
    avatarColor: '#C08A2E',
  },
  {
    username: 'CS1087',
    password: 'campus1087',
    name: 'Priya Nair',
    studentId: 'CS1087',
    department: 'Information Science',
    year: '2nd Year',
    email: 'priya.nair@campushub.edu',
    phone: '555-0187',
    skills: ['Java', 'Data Structures'],
    avatarColor: '#4F7A5B',
  },
  {
    username: 'CS1134',
    password: 'campus1134',
    name: 'Jordan Blake',
    studentId: 'CS1134',
    department: 'Computer Science',
    year: '4th Year',
    email: 'jordan.blake@campushub.edu',
    phone: '555-0134',
    skills: ['Node.js', 'Cloud Infrastructure'],
    avatarColor: '#8858A5',
  },
  {
    username: 'CS1198',
    password: 'campus1198',
    name: 'Sam Okafor',
    studentId: 'CS1198',
    department: 'Electronics & Communication',
    year: '1st Year',
    email: 'sam.okafor@campushub.edu',
    phone: '555-0198',
    skills: ['Circuit Design'],
    avatarColor: '#B5484D',
  },
];

async function run() {
  await connectDB();

  console.log('[seed] clearing existing collections...');
  await Promise.all([
    User.deleteMany({}),
    Event.deleteMany({}),
    Assignment.deleteMany({}),
    Note.deleteMany({}),
  ]);

  console.log('[seed] creating students...');
  const users = [];
  for (const s of STUDENTS) {
    const passwordHash = await bcrypt.hash(s.password, 10);
    const user = await User.create({ ...s, passwordHash });
    users.push(user);
  }
  const [alex, priya, jordan, sam] = users;

  const daysAgo = (n) => new Date(Date.now() - n * 86400000);
  const daysFromNow = (n) => new Date(Date.now() + n * 86400000);

  console.log('[seed] creating events...');
  await Event.insertMany([

    {
      title: 'Industry Talk: Careers in Cloud Engineering',
      type: 'Industry Talk',
      date: daysFromNow(2),
      time: '4:00 PM',
      location: 'Seminar Hall B',
      organizer: 'Placement Cell',
      description:
        'A visiting engineer from a cloud infrastructure company will speak about career paths in platform and reliability engineering, followed by an open Q&A.',
    },
    {
      title: 'Campus Hackathon',
      type: 'Hackathon',
      date: daysFromNow(5),
      time: '9:00 AM',
      location: 'Innovation Lab',
      organizer: 'Campus Technical Club',
      description:
        '24 hours of building. Open to all departments, teams of up to four. Prizes for the top three projects judged by faculty and industry mentors.',
    },
    {
      title: 'Technical Workshop: Intro to Version Control',
      type: 'Technical Workshop',
      date: daysFromNow(1),
      time: '2:00 PM',
      location: 'Computer Lab 3',
      organizer: 'Computer Science Department',
      description:
        'A hands-on session covering everyday Git workflows, useful for the upcoming project submissions and hackathon.',
    },
    {
      title: 'Club Orientation: Campus Technical Club',
      type: 'Club Orientation',
      date: daysFromNow(3),
      time: '5:30 PM',
      location: 'Student Activity Center',
      organizer: 'Campus Technical Club',
      description:
        'New members are welcome to learn about ongoing projects, weekly meetups, and how to get involved this semester.',
    },
    {
      title: 'Resume Review Drop-in',
      type: 'Resume Review',
      date: daysFromNow(4),
      time: '11:00 AM',
      location: 'Career Services Office',
      organizer: 'Placement Cell',
      description:
        'Bring a printed or digital copy of your resume for a short one-on-one review ahead of the placement season.',
    },

    {
      title: 'Guest Lecture: Distributed Systems in Practice',
      type: 'Guest Lecture',
      date: daysFromNow(6),
      time: '3:00 PM',
      location: 'Seminar Hall B',
      organizer: 'Computer Science Department',
      description:
        'A visiting speaker session exploring real-world distributed architectures, consensus algorithms, and fault tolerance in high-throughput systems.',
      cancelled: true,
    },
    {
      title: 'Placement Preparation: Mock Technical Interviews',
      type: 'Placement Preparation',
      date: daysFromNow(7),
      time: '10:00 AM',
      location: 'Seminar Hall A',
      organizer: 'Placement Cell',
      description:
        'Volunteer alumni will conduct mock technical interviews. Sign up at the Placement Cell desk; slots are limited.',
      cancelled: true,
    },
  ]);

  console.log('[seed] creating assignments...');
  await Assignment.insertMany([
    {
      student: alex._id,
      title: 'Build a Responsive Student Portal',
      subject: 'Web Engineering',
      deadline: daysFromNow(3),
      status: 'in_progress',
      description: 'Implement a responsive layout with a working navigation component and at least two data-driven views.',
    },
    {
      student: alex._id,
      title: 'SQL Query Optimization',
      subject: 'Database Systems',
      deadline: daysFromNow(6),
      status: 'not_started',
      description: 'Analyze the provided query set and submit optimized versions with execution plan comparisons.',
    },
    {
      student: alex._id,
      title: 'Requirements Analysis',
      subject: 'Software Engineering',
      deadline: daysFromNow(4),
      status: 'not_started',
      description: 'Produce a requirements document for the assigned case study, including at least five user stories.',
    },
    {
      student: priya._id,
      title: 'Binary Search Tree Implementation',
      subject: 'Data Structures',
      deadline: daysFromNow(2),
      status: 'in_progress',
      description: 'Implement insertion, deletion, and in-order traversal, with unit tests for each operation.',
    },
    {
      student: jordan._id,
      title: 'Capstone Project: Architecture Document',
      subject: 'Software Engineering',
      deadline: daysFromNow(10),
      status: 'not_started',
      description: 'Submit a system architecture document for your capstone project, including a deployment diagram.',
    },
    {
      student: sam._id,
      title: 'Logic Gate Design Report',
      subject: 'Digital Electronics',
      deadline: daysFromNow(5),
      status: 'not_started',
      description: 'Design and document a combinational circuit meeting the specification provided in class.',
    },
  ]);

  console.log('[seed] creating notes...');
  await Note.insertMany([
    { student: alex._id, content: 'Review DBMS normalization before Monday.' },
    { student: alex._id, content: 'Ask Priya about the hackathon team roster.' },
  ]);

  console.log('[seed] done.');
  await mongoose.connection.close();
  process.exit(0);
}

run().catch((err) => {
  console.error('[seed] failed:', err);
  process.exit(1);
});
