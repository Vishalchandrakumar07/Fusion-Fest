# Quick Reference - Event Registration System

## 🚀 Get Started in 3 Steps

### Step 1: Initialize Database
Go to Supabase Dashboard → SQL Editor → Paste and run:
```sql
-- Copy contents from: scripts/setup-registrations-table.sql
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Test
```bash
npm run dev
# Visit http://localhost:3000/register
```

---

## 📍 Key URLs

| Page | URL | Purpose |
|------|-----|---------|
| Registration | `/register` | User registration form |
| Home | `/` | Main website (register button updated) |
| API Register | `/api/register` | Form submission endpoint |
| DB Status | `/api/init-db` | Check database health |

---

## 📂 Important Files

| File | Purpose | Size |
|------|---------|------|
| `app/register/page.tsx` | Registration page | 34 lines |
| `components/registration-form.tsx` | Form component | 368 lines |
| `app/api/register/route.ts` | Submit API | 62 lines |
| `scripts/setup-registrations-table.sql` | Database migration | 37 lines |

---

## 🗄️ Database Info

**Table:** `event_registrations`

**Columns:**
- `id` - Auto-increment primary key
- `full_name` - User's full name (required)
- `email` - User's email (required)
- `phone_number` - User's phone (required)
- `college_name` - College name (optional)
- `department` - Department (optional)
- `year_semester` - Year/semester (optional)
- `event_selection` - Event choice (optional)
- `additional_notes` - Extra info (optional)
- `created_at` - Submission timestamp
- `updated_at` - Update timestamp

**Indexes:** email, created_at (for performance)

---

## ⚙️ Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
```

All auto-configured with Supabase integration.

---

## 🧪 Quick Tests

### Test Form Submission
```bash
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "full_name": "John Doe",
    "email": "john@example.com",
    "phone_number": "+91-9876543210"
  }'
```

### Check Database
```bash
curl http://localhost:3000/api/init-db
```

### View in Supabase
1. Go to Supabase Dashboard
2. Click "Table Editor"
3. Select "event_registrations"
4. View all registrations

---

## ✏️ Customize

### Add More Events
File: `components/registration-form.tsx`
Find: `const EVENTS = [`
Add event name to array

### Add More Departments
File: `components/registration-form.tsx`
Find: `const DEPARTMENTS = [`
Add department name to array

### Change Form Fields
File: `components/registration-form.tsx`
- Add new field to form JSX
- Add to FormData interface
- Add validation if needed
- Update API route

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Table not found | Run SQL migration in Supabase |
| Form won't submit | Check API endpoint, env vars, browser console |
| Data not in DB | Verify RLS policies, service role key |
| Styling wrong | Clear cache, restart dev server |
| Getting 401/403 | Check Supabase credentials and RLS |

---

## 📖 Documentation

| Document | Purpose |
|----------|---------|
| `REGISTRATION_SETUP.md` | Complete setup guide |
| `CHANGES.md` | What was added |
| `INTEGRATION_GUIDE.md` | Technical architecture |
| `DEPLOYMENT_CHECKLIST.md` | Before going live |
| `README_REGISTRATION.md` | Full readme |
| `IMPLEMENTATION_SUMMARY.md` | What was built |

---

## 🔐 Security Checklist

- ✅ RLS enabled on database table
- ✅ Service role key stored server-side
- ✅ Client-side and server-side validation
- ✅ Email validation implemented
- ✅ HTTPS required for production

---

## 📱 Form Fields

**Required (3):**
1. Full Name
2. Email Address
3. Phone Number

**Optional (5):**
4. College Name
5. Department
6. Year/Semester
7. Event Selection
8. Additional Notes

---

## 🎯 Events

**Technical:** PaperXpo, Tech Escape, Error Auction, Web Architect, Prompt Olympia

**Non-Technical:** Short Film, E-Sports, Meme Marathon, Connection, Treasure Hunt

---

## 🚢 Deployment

1. Setup database (run SQL migration)
2. Test locally (npm run dev)
3. Push to git (git push)
4. Deploy to Vercel (merge/publish)
5. Test in production
6. Monitor logs

---

## 💾 Export Data

1. Supabase Dashboard
2. Table Editor → event_registrations
3. Click "Export"
4. Select "CSV"
5. Download file

---

## 🆘 Get Help

1. Check relevant documentation file (*.md)
2. Look at browser console for errors
3. Check Vercel logs
4. Check Supabase dashboard
5. Review INTEGRATION_GUIDE.md

---

## ✨ Features

✅ Form validation (required fields, email format)
✅ Database persistence (Supabase PostgreSQL)
✅ Success confirmation screen
✅ Error handling and display
✅ Mobile responsive design
✅ Performance optimized (indexes)
✅ Secure (RLS policies, server validation)
✅ Accessible (ARIA labels, semantic HTML)

---

## 📊 Stats

- **Reg Form Lines:** 368
- **API Route Lines:** 62
- **Total Code:** ~500 lines
- **Setup Time:** 30 min
- **Deployment Time:** 5 min
- **Database Records:** Unlimited

---

## 🎯 Next Steps

1. ✅ Setup database (REGISTRATION_SETUP.md)
2. ✅ Test locally (npm run dev)
3. ✅ Deploy to production (push/merge)
4. ✅ Monitor registrations (Supabase)
5. ✅ Send event details to registrants
6. ✅ Track attendance

---

## 📞 Support

**For Setup Issues:**
→ See REGISTRATION_SETUP.md

**For Technical Questions:**
→ See INTEGRATION_GUIDE.md

**For Deployment:**
→ See DEPLOYMENT_CHECKLIST.md

**For General Info:**
→ See README_REGISTRATION.md

---

**Version:** 1.0  
**Last Updated:** Feb 10, 2026  
**Status:** ✅ Ready to Deploy
