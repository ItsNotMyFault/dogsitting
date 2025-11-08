using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace dogsitting_backend.Domain.media
{
    public class ReservationMedia
    {
        public Guid ReservationId { get; set; }
        public Reservation Reservation { get; set; }

        public Guid MediaId { get; set; }
        public Media Media { get; set; }
    }
}
