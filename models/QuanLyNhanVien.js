function Staff(
  account,
  name,
  email,
  password,
  dateStarted,
  basicSalary,
  level,
  workingHours
) {
  this.account = account;
  this.name = name;
  this.email = email;
  this.password = password;
  this.dateStarted = dateStarted;
  this.basicSalary = basicSalary;
  this.level = level;
  this.workingHours = workingHours;
  this.totalSalary = function () {
    if (this.level === "Sếp") {
      return this.basicSalary * 3;
    }
    if (this.level === "Trưởng phòng") {
      return this.basicSalary * 2;
    } else {
      return this.basicSalary;
    }
  };
  this.staffClassification = function () {
    if (this.workingHours >= 192) {
      return "Nhân viên xuất sắc";
    } else if (this.workingHours < 192 && this.workingHours >= 176) {
      return "Nhân viên giỏi";
    } else if (this.workingHours < 176 && this.workingHours >= 160) {
      return "Nhân viên khá";
    } else {
      return "Nhân viên trung bình";
    }
  };
}
