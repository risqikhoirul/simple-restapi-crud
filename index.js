const express = require("express");
const app = express();
const mysql = require("mysql2");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "produksi_pangan",
});

// Definisikan skema tabel
const createTableQuery = `
CREATE TABLE IF NOT EXISTS kecamatan_ngraho (No int(10) NOT NULL AUTO_INCREMENT PRIMARY KEY, Jenis varchar(50) NOT NULL, Tanam float(20) NOT NULL, Panen float(20) NOT NULL, Produksi float(20) NOT NULL, Provitas float(20) NOT NULL);
`;

// Eksekusi query untuk membuat tabel
connection.query(createTableQuery, (error, results, fields) => {
  if (error) throw error;
  console.log("Tabel telah dibuat atau sudah ada.");
});

app.get("/", (req, res) => {
  // simple query
  connection.query("SELECT * FROM kecamatan_ngraho;", (err, results, fields) => {
    // console.log(results);
    if (err) {
      return res.status(404).json({
        success: false,
        message: "Error get data",
        error: err,
      });
    }
    res.status(200).json({
      success: true,
      message: results,
    });
  });
});

app.get("/:id", (req, res) => {
  const No = req.params.id;
  connection.query(`SELECT * FROM kecamatan_ngraho WHERE No = ?;`, [No], (err, results, fields) => {
    // console.log(results);
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Error deleting data",
        error: err,
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No. ${No} not found`,
      });
    }

    res.status(200).json({
      success: true,
      message: results,
    });
  });
});

app.post("/add", (req, res) => {
  // simple query
  connection.query(`INSERT INTO kecamatan_ngraho (Jenis, Tanam, Panen, Produksi, Provitas) VALUES (?, ?, ?, ?, ?);`, [req.body.Jenis, req.body.Tanam, req.body.Panen, req.body.Produksi, req.body.Provitas], (erro, results, fields) => {
    // console.log(results);
    connection.query(`SELECT * FROM kecamatan_ngraho ORDER BY No DESC LIMIT 1;`, (err, responx, fieldsx) => {
      if (erro || err) {
        return res.status(500).json({
          success: false,
          message: "Error add data",
          error: erro,
        });
      }
      res.status(200).json({
        success: true,
        message: responx,
      });
    });
  });
});

app.put("/update/:id", (req, res) => {
  const No = req.params.id;
  // simple query
  connection.query(
    `UPDATE kecamatan_ngraho SET Jenis = ?, Tanam = ?, Panen = ?, Produksi = ?, Provitas = ? WHERE No = ?;`,
    [req.body.Jenis, req.body.Tanam, req.body.Panen, req.body.Produksi, req.body.Provitas, No],
    (erro, results, fields) => {
      // console.log(results);
      connection.query(`SELECT * FROM kecamatan_ngraho ORDER BY No DESC LIMIT 1;`, (err, responx, fieldsx) => {
        if (erro || err) {
          return res.status(500).json({
            success: false,
            message: "Error update data",
            error: erro,
          });
        }
        res.status(200).json({
          success: true,
          message: responx,
        });
      });
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const No = req.params.id;
  connection.query(`DELETE FROM kecamatan_ngraho WHERE No = ?;`, [No], (err, results, fields) => {
    // console.log(results);
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Error deleting data",
        error: err,
      });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: `No. ${No} not found`,
      });
    }

    res.status(200).json({
      success: true,
      message: `Data No. ${No} deleted successfully`,
    });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("listen on port " + PORT);
});
