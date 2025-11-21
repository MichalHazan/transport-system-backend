import { Request, Response } from "express";

export const apiDocs = (req: Request, res: Response) => {
  res.send(`
    <html dir="rtl" lang="he">
      <head>
        <title>API Documentation</title>
        <style>
          body {
            font-family: Arial;
            background: #f5f7fa;
            padding: 20px;
          }
          h1 {
            color: #2c3e50;
          }
          h2 {
            color: #34495e;
            margin-top: 30px;
          }
          .route-box {
            background: white;
            padding: 15px;
            margin: 10px 0;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            line-height: 1.7;
          }
          code {
            background: #eef1f4;
            padding: 3px 6px;
            border-radius: 5px;
          }
        </style>
      </head>
      <body>
        <h1>📘 API Documentation</h1>
        <p>ברוכה הבאה ל־Transport API</p>

        <h2>🔐 Auth</h2>
        <div class="route-box">
          POST <code>/api/auth/register</code><br>
          POST <code>/api/auth/login</code>
        </div>

        <h2>👤 Client</h2>
        <div class="route-box">
          GET <code>/api/client/ride</code> – כל הבקשות של הלקוח<br>
          POST <code>/api/client/ride</code> – יצירת בקשה<br>
          DELETE <code>/api/client/ride/:id</code> – מחיקת בקשה<br>
          GET <code>/api/client/quotes</code> – כל ההצעות שקיבל הלקוח
        </div>

        <h2>🚐 Supplier</h2>
        <div class="route-box">
          GET <code>/api/supplier/requests</code> – קבלת בקשות זמינות<br>
          POST <code>/api/supplier/quote</code> – הגשת הצעה<br>
          GET <code>/api/supplier/quotes</code> – הצעות הספק
        </div>

        <h2>🛠 Admin</h2>
        <div class="route-box">
          GET <code>/api/admin/overview</code> – בקשות + הצעות<br>
          POST <code>/api/admin/approve</code> – אישור הצעה<br>
          DELETE <code>/api/admin/ride/:id</code> – מחיקת בקשה<br>
          DELETE <code>/api/admin/quote/:id</code> – מחיקת הצעה
        </div>

        <h2>👥 Users</h2>
        <div class="route-box">
          GET <code>/api/users</code> – כל המשתמשים<br>
          PUT <code>/api/users/:id</code> – עדכון משתמש<br>
          DELETE <code>/api/users/:id</code> – מחיקת משתמש
        </div>

        <br><br>
        <small>Transport System © 2025</small>
      </body>
    </html>
  `);
};
