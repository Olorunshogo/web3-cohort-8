mod grade;
mod registry;
mod registry_uuid;
mod registry_struct;
mod student_struct;
mod utils;

use grade::{Grade, Sex};
use registry::Registry;
use registry_uuid::RegistryUUID;

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

    // === Registry with UUID IDs
    println!("\n\nRegistryUUID\n");

    let mut uuid_registry = RegistryUUID::new();

    uuid_registry.add("Basongo", 23, Sex::Male, Grade::Second, 72.5);
    uuid_registry.add("Faith", 19, Sex::Female, Grade::First, 88.0);
    uuid_registry.add("Mac5", 20, Sex::Male, Grade::Third, 55.0);

    println!("\n All UUID students ");
    uuid_registry.list_all();

    let basongo_id = uuid_registry.students[0].id;
    let faith_id = uuid_registry.students[1].id;

    println!("\n Update Basongo's name ");
    uuid_registry.update_name(basongo_id, "Ochuko, Isaac Onodairo".to_string());
    uuid_registry.get_student_by_id(basongo_id);

    println!("\n Delete the first UUID student ");
    uuid_registry.delete_student(basongo_id);

    println!("\n Get UUID of a student");
    uuid_registry.get_student_by_id(faith_id);

    println!("\n Update Faith's age to 92 ");
    uuid_registry.update_age(faith_id, 92);
    uuid_registry.get_student_by_id(faith_id);

    uuid_registry.list_all();
}
