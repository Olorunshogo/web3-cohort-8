use crate::grade::{Grade, Sex};
use crate::student_struct::StudentUUID;
use uuid::Uuid;

pub struct RegistryUUID {
    pub students: Vec<StudentUUID>,
}

impl RegistryUUID {
    pub fn new() -> RegistryUUID {
        RegistryUUID {
            students: Vec::new(),
        }
    }

    // === Add student to registry
    pub fn add(&mut self, name: &str, age: u8, sex: Sex, grade: Grade, score: f32) {
        let student = StudentUUID::new(name.to_string(), age, sex, grade, score);
        println!("Added: {} with the following ID - {}", student.name, student.id);
        self.students.push(student);
    }

    // === List all students
    pub fn list_all(&self) {
        if self.students.is_empty() {
            println!("  (no students enrolled yet)");
            return;
        }
        println!(
            "  {:<38}  {:<20}  {:<6}  {:<10}  {}",
            "ID", "Name", "Age", "Grade", "Score"
        );
        println!("  {}", "-".repeat(85));
        for student in &self.students {
            println!(
                "  {:<38}  {:<20}  {:>6}  {:<10}  {:.1}",
                student.id,
                student.name,
                student.age,
                student.grade.as_str(),
                student.score,
            );
        }
    }

    // === Get student by UUID
    pub fn get_student_by_id(&self, id: Uuid) {
        if let Some(student) = self.students.iter().find(|s| s.id == id) {
            println!("{:?}", student);
        } else {
            println!("Student with ID {} not found", id);
        }
    }

    // === Update fields
    pub fn update_age(&mut self, id: Uuid, new_age: u8) -> Option<()> {
        if let Some(student) = self.students.iter_mut().find(|s| s.id == id) {
            student.age = new_age;
            println!("Updated age for student ID {}", id);
            Some(())
        } else {
            println!("Student with ID {} not found", id);
            None
        }
    }

    pub fn update_name(&mut self, id: Uuid, new_name: String) -> Option<()> {
        if let Some(student) = self.students.iter_mut().find(|s| s.id == id) {
            student.name = new_name;
            println!("Updated name for student ID {}", id);
            Some(())
        } else {
            println!("Student with ID {} not found", id);
            None
        }
    }

    #[allow(dead_code)]
    pub fn update_sex(&mut self, id: Uuid, new_sex: Sex) -> Option<()> {
        if let Some(student) = self.students.iter_mut().find(|s| s.id == id) {
            student.sex = new_sex;
            println!("Updated sex for student ID {}", id);
            Some(())
        } else {
            println!("Student with ID {} not found", id);
            None
        }
    }

    #[allow(dead_code)]
    pub fn update_grade(&mut self, id: Uuid, new_grade: Grade) -> Option<()> {
        if let Some(student) = self.students.iter_mut().find(|s| s.id == id) {
            student.grade = new_grade;
            println!("Updated grade for student ID {}", id);
            Some(())
        } else {
            println!("Student with ID {} not found", id);
            None
        }
    }

    pub fn delete_student(&mut self, id: Uuid) -> Option<()> {
        if let Some(index) = self.students.iter().position(|s| s.id == id) {
            self.students.remove(index);
            println!("Deleted student ID {}", id);
            Some(())
        } else {
            println!("Student with ID {} not found", id);
            None
        }
    }
}
