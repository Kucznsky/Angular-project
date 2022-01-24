using Backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Backend.Data
{
    public class AppDBContext : DbContext
    {
        public DbSet<Film> Films { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<Screening> Screenings { get; set; }
        public DbSet<TakenSeat> TakenSeats { get; set; }

        
        public AppDBContext(DbContextOptions<AppDBContext> options)
            : base(options)
        { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Screening>()
                    .HasOne<Film>(e => e.Film)
                    .WithMany()
                    .HasForeignKey(e => e.FilmID);
            builder.Entity<Screening>()
                    .HasOne<Room>(e => e.Room)
                    .WithMany()
                    .HasForeignKey(e => e.RoomID);

            builder.Entity<TakenSeat>()
                    .HasKey(e => new { e.ScreeningID, e.SeatID });
            builder.Entity<TakenSeat>()
                    .HasOne<Screening>(e => e.Screening)
                    .WithMany()
                    .HasForeignKey(e => e.ScreeningID);

            builder.Entity<Film>().HasData(
                    new Film { ID= 1, Title= "Diune", ScreeningTime= 156 },
                    new Film { ID= 2, Title= "The Intouchables", ScreeningTime= 112 },
                    new Film { ID= 3, Title= "Bee Movie", ScreeningTime= 91 },
                    new Film { ID= 4, Title= "Hot Fuzz", ScreeningTime= 121 },
                    new Film { ID= 5, Title= "Motywacja", ScreeningTime= 600 }
                );
            builder.Entity<Room>().HasData(
                    new Room { ID= 1, Capacity= 60 },
                    new Room { ID= 2, Capacity= 150 }
                );
        }
    }
}