﻿using System.ComponentModel.DataAnnotations;

namespace uBit_Backend_Thingy.Models
{
    public class RegisterModel
    {
        [Required(ErrorMessage = "Username is required!")]
        public string Username { get; set; }
        
        [Required(ErrorMessage = "Password is required!")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Role is required!")]
        public string Role { get; set; }
    }
}
