const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('shops.db');

db.serialize(() => {
  // Create the shops table if it doesn't exist
  db.run(`CREATE TABLE IF NOT EXISTS shops (
    id INTEGER PRIMARY KEY,
    data JSON
  )`);

  // Prepare the SQL statement for inserting data
  const stmt = db.prepare("INSERT INTO shops (id, data) VALUES (?, ?)");

  // Insert multiple records into the shops table
  stmt.run(0, JSON.stringify({
    latitudes: 13.007002761475542,
    longitudes: 80.2533483685362,
    distance: 0,
    name: "Centre 1",
    Battery: "20(Car 1 Model 1), 10(Car 2 Model 3)\n5(other general cars)",
    Motor: "Example 1 Motor(2-100cc,5-750cc), Car 1 motors 7-350cc",
    Tyres: "10 small, 5medium, 7 large, Example1 tyres,\n5 medium Example2 Tyres"
  }));

  stmt.run(1, JSON.stringify({
    latitudes: 12.936973545461063,
    longitudes: 77.59047995677919,
    distance: 0,
    name: "Centre 2",
    Battery: "20(Car 1 Model 1), 10(Car 1 Model 2)\n5(other general cars)",
    Motor: "Example 1 Motor(2-100cc,5-750cc), Car 1 motors 7-350cc",
    Tyres: "10 small, 5medium, 7 large, Example3 tyres,\n5 medium Example1 Tyres",
    Chassis: "5 gear shifts(car 1 model 5), 2 body parts(car 5 model 2)"
  }));

  stmt.run(2, JSON.stringify({
    latitudes: 13.009669526650567, 
    longitudes: 80.25200628707896,
    distance: 0,
    name: "Centre 3",
    Battery: "20(Car 2 model 1), 10(Car 1 Model 2)\n5(other general cars)",
    Motor: "Example 1 Motor(2-100cc,5-750cc), Car 1 motors 7-350cc",
    Tyres: "10 small, 5medium, 7 large, Example3 tyres,\n5 medium Example2 Tyres",
    Chassis: "5 gear shifts(Car 2 model 1), 2 body parts(Car 5 model 1)"
  }));

  stmt.run(3, JSON.stringify({
    latitudes: 13.007250364262896,
    longitudes: 80.25133336274796,
    distance: 0,
    name: "Centre 4",
    Battery: "20(Car 1 Model 2), 10(Car 1 Model 3)\n2(other general cars)",
    Motor: "Car3 Motor(2-100cc,5-750cc), Car 1 motors 7-350cc",
    Tyres: "10 small, 5medium, 7 large, Example1 tyres,\n5 medium Example5 Tyres",
    Chassis: "5 gear shifts(Car 2 model 1), 2 body parts(Car 5 model 1)"
  }));

  stmt.run(4, JSON.stringify({
    latitudes: 13.0072503642484699,
    longitudes: 80.35133336274796,
    distance: 0,
    name: "Centre 5",
    Battery: "20(Car 1 Model 1), 10(Car 1 Model 2)\n5(other general cars)",
    Motor: "Example 1 Motor(2-100cc,5-750cc), Car 1 motors 7-350cc",
    Tyres: "5 medium Example4 Tyres",
    Chassis: "5 gear shifts(Car 2 Model 4), 2 body parts(Car 3 model 3)"
  }));

  stmt.run(5, JSON.stringify({
    latitudes: 13.0072506423225090,
    longitudes: 80.25233336274796,
    distance: 0,
    name: "Centre 6",
    Battery: "20(Car 1 Model 1), 10(Car 1 Model 2)\n5(other general cars)",
    Tyres: "10 small, 5medium, 7 large, Example2 tyres,\n5 medium Example1 Tyres",
    Chassis: "5 gear shifts(Car 2 Model 1), 2 body parts(Car 4 Model 5)"
  }));

  stmt.run(6, JSON.stringify({
    latitudes: 13.00592928087087129,
    longitudes: 80.25171693792989,
    distance: 0,
    name: "Centre 7",
    Tyres: "10 small, 5medium, 7 large, Example1 tyres,\n5 medium Example2 Tyres",
    Chassis: "5 gear shifts(Car 3 EV), 2 body parts(Car 5 EV)"
  }));

  // Finalize the statement
  stmt.finalize();
});

// Close the database connection
db.close();
