using ContactForm.Entities;
using Microsoft.EntityFrameworkCore;

namespace ContactForm.Data
{
    public class DataContext: DbContext
    {
        public DataContext(DbContextOptions<DataContext> options)
        : base(options)
        {
        }

        // DbSet properties for your entities
        public DbSet<Contact> Contacts { get; set; }
        public DbSet<User> users { get; set; }
    }
}
