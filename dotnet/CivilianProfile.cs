using Sabio.Models.Domain.Users;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Sabio.Models.Domain.CivilianProfiles
{
    public class CivilianProfile
    {
        public int Id { get; set; }
        public BaseUser User { get; set; }
        public int MonthlyIncome { get; set; }
        public DateTime MoveInDate { get; set; }
        public DateTime DateModified { get; set; }
    }
}