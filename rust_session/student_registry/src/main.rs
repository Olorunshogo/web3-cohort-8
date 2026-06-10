mod grade;
mod registry;
mod registry_struct;
mod student_struct;
mod utils;

use grade::{Grade, Sex};
use registry::Registry;

fn main() {
    // === Registry with u32 IDs
    println!("Registry Table\n");

    let mut registry = Registry::new();

    registry.add("Kingsman", 20, Sex::Female, Grade::First, 78.5);
    registry.add("Jigan", 42, Sex::Female, Grade::Second, 64.0);
    registry.add("Yusrah", 21, Sex::Female, Grade::First, 91.0);
    registry.add("Testimony", 16, Sex::Female, Grade::Third, 40.5);

    println!("\n All students ");
    registry.list_all();

    println!("\n Get student ID 2 ");
    registry.get_student_by_id(2);

    println!("\n Update Jigan's age to 23 ");
    registry.update_age(2, 36);
    registry.get_student_by_id(2);

    println!("\n Update Jigan's name ");
    registry.update_name(2, "Jigah".to_string());
    registry.get_student_by_id(2);

    println!("\n Update Kingsman's sex ");
    registry.update_sex(1, Sex::Male);
    registry.get_student_by_id(1);

    println!("\n Update kingsman's grade ");
    registry.update_grade(1, Grade::Second);
    registry.get_student_by_id(1);

    println!("\n Delete student ID 3 (Yusrah) ");
    registry.delete_student(3);
    registry.list_all();
}
