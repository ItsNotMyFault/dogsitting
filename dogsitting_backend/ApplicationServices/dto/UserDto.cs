using dogsitting_backend.Domain.auth;
using dogsitting_backend.Domain.media;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Principal;

namespace dogsitting_backend.Domain;

public class UserDto
{
	public UserDto() { }

	public string FirstName { get; set; }
	public string LastName { get; set; }

	public string Email { get; set; }
	public string? PhoneNumber { get; set; }
	public string Name { get => this.FirstName + " " + this.LastName; }



}


