﻿using System.ComponentModel.DataAnnotations;

namespace Application.Authentication.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
