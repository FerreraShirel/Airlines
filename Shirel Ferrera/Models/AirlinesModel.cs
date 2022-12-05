using System.Collections.Generic;

namespace Shirel_Ferrera.Models
{
    public class AirlinesModel
    {
        public List<AirlineViewModel> Airlines{ get; set; }

        public AirlinesModel()
        {
            Airlines = new List<AirlineViewModel>();
        }
    }
}