use crate::grade::{Grade, Sex};
use uuid::Uuid;

#[derive(Debug)]
pub struct Student {
    pub id: u32,
    pub name: String,
    pub age: u8,
    pub sex: Sex,
    pub grade: Grade,
    pub score: f32,
}

impl Student {
    pub fn new(id: u32, name: String, age: u8, sex: Sex, grade: Grade, score: f32) -> Student {
        Student {
            id,
            name,
            age,
            sex,
            grade,
            score,
        }
    }
}

#[derive(Debug)]
pub struct StudentUUID {
    pub id: Uuid,
    pub name: String,
    pub age: u8,
    pub sex: Sex,
    pub grade: Grade,
    pub score: f32,
}

impl StudentUUID {
    pub fn new(name: String, age: u8, sex: Sex, grade: Grade, score: f32) -> StudentUUID {
        StudentUUID {
            id: Uuid::new_v4(),
            name,
            age,
            sex,
            grade,
            score,
        }
    }
}

#[allow(dead_code)]
#[derive(Debug)]
pub enum Status {
    Pending,
    Ongoing,
    Completed,
}

#[allow(dead_code)]
pub struct Todo {
    pub id: u8,
    pub title: String,
    pub description: String,
    pub status: Status,
}
