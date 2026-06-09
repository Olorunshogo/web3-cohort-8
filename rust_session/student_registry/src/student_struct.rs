#[derive(Debug)]
pub enum Sex {
    Male,
    Female
}

// ── 2. STRUCT ────────────────────────────────────────────────
// A struct groups related pieces of data under one name.
// Think of it as a custom data type you design yourself.
pub struct Student {
    id: u32,      // u32  = unsigned 32-bit integer (no negatives)
    name: String, // String = heap-allocated, growable text
    age: u8,      // u8   = 0–255, plenty for an age
    sex: Sex,
    grade: Grade, // our own enum type from above
    score: f32,   // f32  = 32-bit floating point number
}

#[derive(Debug)]
pub struct Student {
    pub id: u32,      // u32  = unsigned 32-bit integer (no negatives)
    pub name: String, // String = heap-allocated, growable text
    pub age: u8,
    pub sex: Sex,
    pub grade: Grade, // our own enum type from above
    pub score: f32,
}

// This is the implementation of the student struct with its corresponding methods
impl Student {
    fn new(_id: u32, _name: String, _age: u8, sex: Sex, grade: Grade, score: f32) -> Student {
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
pub enum Status {
    Pending,
    Ongoing,
    Completed,
}

pub struct Todo {
    id: u8,
    title: String,
    description: String,
    status: Status,
}
