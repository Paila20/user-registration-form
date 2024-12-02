
document.addEventListener("DOMContentLoaded", function () {
document.getElementById("togglePassword").addEventListener("click", function () {
  const passwordInput = document.getElementById("password");
  const isPassword = passwordInput.type === "password";
  passwordInput.type = isPassword ? "text" : "password";
  

  this.classList.toggle("fa-eye-slash");
  this.classList.toggle("fa-eye");
});

document.getElementById("confirmtogglePassword").addEventListener("click", function () {
  const passwordInput = document.getElementById("confirmPassword");
  const isPassword = passwordInput.type === "password";
  passwordInput.type = isPassword ? "text" : "password";
  
 
  this.classList.toggle("fa-eye-slash");
  this.classList.toggle("fa-eye");
});

// Validation rules
const validationRules = {
  fullName: {
    validate: () => document.getElementById("fullName").value.trim().length >= 2,
    errorMessage: "Full Name must be at least 2 characters.",
  },
  email: {
    validate: () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(document.getElementById("email").value.trim()),
    errorMessage: "Enter a valid email.",
  },
  password: {
    validate: () => /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(document.getElementById("password").value.trim()),
    errorMessage: "Password must be at least 8 characters, include a number and a special character.",
  },
  confirmPassword: {
    validate: () => {
      const password = document.getElementById("password").value.trim();
      const confirmPassword = document.getElementById("confirmPassword").value.trim();
      
      if (confirmPassword === "") {
        return false; 
      }
      return confirmPassword === password;
    },
    errorMessage: "Passwords do not match.",
  },
  dob: {
    validate: () => {
      const dobDate = new Date(document.getElementById("dob").value);
      const today = new Date();
      const age = today.getFullYear() - dobDate.getFullYear();
      return age >= 18 && (dobDate.getMonth() < today.getMonth() || (dobDate.getMonth() === today.getMonth() && dobDate.getDate() <= today.getDate()));
    },
    errorMessage: "You must be at least 18 years old.",
  },
  gender: {
    validate: () => !!document.querySelector('input[name="gender"]:checked'),
    errorMessage: "Please select your gender.",
  },
  country: {
    validate: () => document.getElementById("country").value.trim() !== "",
    errorMessage: "Please select your country.",
  },
  profilePicture: {
    validate: () => {
      const profilePicture = document.getElementById("profilePicture").files[0];
      return profilePicture && ["image/jpeg", "image/png"].includes(profilePicture.type) && profilePicture.size <= 2 * 1024 * 1024;
    },
    errorMessage: "Upload a valid JPG/PNG image (max 2MB).",
  },
  agree: {
    validate: () => document.getElementById("agree").checked,
    errorMessage: "You must agree to the terms and conditions.",
  },
};

// Handle form submission
document.getElementById("registrationForm").addEventListener("submit", function (e) {
  e.preventDefault();
  let isValid = true;

  // Clear any existing errors
  document.querySelectorAll(".error").forEach((el) => el.textContent = "");
  document.getElementById("successMessage").textContent = "";
  document.querySelectorAll("input").forEach((field) => {
    // field.classList.remove("input-valid");
    field.style.border = "1px solid #ccc";  
  });
  

  // Validate all fields
  Object.keys(validationRules).forEach((fieldId) => {
    const errorElement = document.getElementById(`${fieldId}Error`);
    const field = document.getElementById(fieldId);
    if (fieldId === "gender") {
      if (!validationRules[fieldId].validate()) {
        errorElement.textContent = validationRules[fieldId].errorMessage;
        field.classList.remove("input-invalid");
        // field.classList.remove("input-valid");
      } else {
        errorElement.textContent = ""; 
        field.classList.remove("input-invalid");
        // field.classList.remove("input-valid"); 
      }
      return; 
    }
    if (!validationRules[fieldId].validate()) {
      errorElement.textContent = validationRules[fieldId].errorMessage;
      field.classList.add("input-invalid");
      // field.classList.remove("input-valid");
      isValid = false;
    }else {
      field.classList.remove("input-invalid");
      // field.classList.add("input-valid");
    }
  });

  if (isValid) {
   alert("Registration Successfull")
    this.reset(); 
  }
});


Object.keys(validationRules).forEach((fieldId) => {
  const field = document.getElementById(fieldId);
  const errorElement = document.getElementById(`${fieldId}Error`);

  field.addEventListener("blur", () => {
     if (fieldId === "gender") {
      if (!validationRules[fieldId].validate()) {
        errorElement.textContent = validationRules[fieldId].errorMessage;
        field.classList.remove("input-invalid");
        // field.classList.remove("input-valid");
      } else {
        errorElement.textContent = ""; 
        field.classList.remove("input-invalid");
        // field.classList.remove("input-valid"); 
      }
      return; 
    }

    if (validationRules[fieldId].validate()) {
      errorElement.textContent = "";
      field.classList.remove("input-invalid");
      // field.classList.add("input-valid");
    } else {
      errorElement.textContent = validationRules[fieldId].errorMessage;
      field.classList.add("input-invalid");
      // field.classList.remove("input-valid");
    }
  });

  field.addEventListener("input", () => {
    if (fieldId === "gender") {
      if (!validationRules[fieldId].validate()) {
        errorElement.textContent = validationRules[fieldId].errorMessage;
        field.classList.remove("input-invalid");
        // field.classList.remove("input-valid");
      } else {
        errorElement.textContent = ""; 
        field.classList.remove("input-invalid");
        // field.classList.remove("input-valid"); 
      }
      return; 
    }

    if (validationRules[fieldId].validate()) {
      errorElement.textContent = "";
      field.classList.remove("input-invalid");
      // field.classList.add("input-valid");
    }
  });
});




});