using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Shirel_Ferrera.DAL;
using Shirel_Ferrera.Models;

namespace Shirel_Ferrera.Controllers
{
    public class AirlineController : Controller
    {
        public ActionResult Index()
        {
            AirlinesModel model = new AirlinesModel
            {
                Airlines = GetData()
            };
            return View(model);
        }
        [HttpPost]
        public string DeleteRow(int id) 
        {
            try
            {
                using (airlineEntities1 db = new airlineEntities1())
                {
                    var temp = db.Airlines.FirstOrDefault(x => x.ID == id);
                    db.Airlines.Remove(temp);
                    db.SaveChanges();
                }
            }
            catch (Exception)
            {

                throw;
            }
            return "true";
        }
        
        [HttpPost]
        public ActionResult UpdateRow(string code, string airlineName,int id)
        {
            AirlinesModel model;
            try
            {
                using (airlineEntities1 db = new airlineEntities1())
                {
                    Airlines airline = db.Airlines.FirstOrDefault(x => x.ID == id);
                    if (airline != null)
                    {
                        airline.Code = code;
                        airline.AirlineName = airlineName;

                        db.SaveChanges();
                    }
                }
                model = new AirlinesModel
                {
                    Airlines = GetData()
                };
            }
            catch (Exception)
            {
                throw;
            }
            return PartialView("TBody", model);
        }

        [HttpPost]
        public ActionResult SaveRow(string code, string airlineName)
        {
            AirlinesModel model; 
            try
            {
                using (airlineEntities1 db = new airlineEntities1())
                {
                    Airlines temp = new Airlines
                    {
                        Code = code,
                        AirlineName = airlineName
                    };
                    db.Airlines.Add(temp);
                    db.SaveChanges(); // מנפיק אי די חדש
                }

                model = new AirlinesModel
                {
                    Airlines = GetData()
                };
            }
            catch (Exception)
            {
                throw;
            }          
            return PartialView("TBody", model); 
        }

        private List<AirlineViewModel> GetData() //   
        {
            List<AirlineViewModel> result = new List<AirlineViewModel>();
            try
            {
                using (airlineEntities1 db = new airlineEntities1())
                {
                    foreach (Airlines airline in db.Airlines)
                    {
                        result.Add(new AirlineViewModel
                        {
                            ID=airline.ID,
                            AirlineName = airline.AirlineName,
                            Code = airline.Code
                        });
                    }
                }
                result = result.OrderByDescending(a => a.AirlineName.Length).ToList(); // 
            }
            catch (Exception)
            { 
                throw;
            }
            return result;
        }
    }
}
       