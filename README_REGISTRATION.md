# 🎉 FusionFest Event Registration System

A complete event registration system for FusionFest 2026, replacing the Google Form with a modern, database-backed solution.

## ✨ What's New

Replaced the external Google Form link with an **integrated registration page** at `/register` that:

- ✅ Stores registrations in Supabase PostgreSQL database
- ✅ Provides real-time form validation
- ✅ Shows success/error messages
- ✅ Works on all devices (mobile-friendly)
- ✅ Matches your existing FusionFest design
- ✅ Integrates seamlessly with your main website

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
# or
pnpm install
```

### 2. Set Up Database
Follow the instructions in **`REGISTRATION_SETUP.md`** to:
- Create the `event_registrations` table
- Configure Row Level Security (RLS)
- Verify environment variables

### 3. Test Registration
1. Visit http://localhost:3000/register
2. Fill out and submit the form
3. See success message
4. View data in Supabase dashboard

### 4. Deploy
```bash
git add .
git commit -m "Add registration system"
git push origin event-registration-page
# Then merge to main branch
```

## 📁 File Structure

```
registration-system/
├── app/
│   ├── register/
│   │   └── page.tsx                 # Registration page
│   └── api/
│       ├── register/
│       │   └── route.ts             # Form submission API
│       └── init-db/
│           └── route.ts             # Database health check
├── components/
│   └── registration-form.tsx        # Form component
├── lib/
│   └── init-db.ts                   # DB utilities
├── scripts/
│   └── setup-registrations-table.sql # Database migration
├── REGISTRATION_SETUP.md            # Setup guide
├── CHANGES.md                       # What was added
├── INTEGRATION_GUIDE.md             # Technical details
└── DEPLOYMENT_CHECKLIST.md          # Pre-deployment checklist
```

## 📋 Form Fields

**Required:**
- Full Name
- Email Address
- Phone Number

**Optional:**
- College Name
- Department (dropdown)
- Year/Semester (dropdown)
- Event Selection (dropdown)
- Additional Notes (textarea)

## 🗄️ Database Schema

```sql
CREATE TABLE event_registrations (
  id BIGSERIAL PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  college_name VARCHAR(255),
  department VARCHAR(255),
  year_semester VARCHAR(50),
  event_selection VARCHAR(255),
  additional_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

## 🎯 Features

| Feature | Status | Details |
|---------|--------|---------|
| Form Validation | ✅ | Required fields, email format checks |
| Database Storage | ✅ | Supabase PostgreSQL with RLS |
| Success Messages | ✅ | Confirmation screen with auto-dismiss |
| Error Handling | ✅ | Helpful error messages |
| Mobile Responsive | ✅ | Works on all screen sizes |
| Performance | ✅ | Optimized with indexes |
| Security | ✅ | Server-side validation, RLS policies |

## 🔐 Security

- **RLS Enabled**: Row Level Security prevents unauthorized access
- **Server-Side Validation**: Never trust client input alone
- **Service Role Key**: Sensitive keys kept on server only
- **Email Validation**: Prevents invalid email entries
- **HTTPS**: Use HTTPS in production

## 📊 Available Events

### Technical Events
- PaperXpo
- Tech Escape
- Error Auction
- Web Architect
- Prompt Olympia

### Non-Technical Events
- Short Film
- E-Sports (Free Fire)
- Meme Marathon
- Connection
- Treasure Hunt

## 🛠️ Environment Variables

Required (should be auto-configured with Supabase):

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## 📖 Documentation

- **`REGISTRATION_SETUP.md`** - Complete setup instructions
- **`CHANGES.md`** - Summary of all changes made
- **`INTEGRATION_GUIDE.md`** - Technical architecture and data flow
- **`DEPLOYMENT_CHECKLIST.md`** - Pre-deployment verification steps

## 🧪 Testing

### Local Testing
```bash
npm run dev
# Visit http://localhost:3000/register
```

### Manual API Testing
```bash
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "full_name": "John Doe",
    "email": "john@example.com",
    "phone_number": "+91-9876543210",
    "college_name": "RVCE",
    "department": "Computer Science and Engineering",
    "year_semester": "2nd Year",
    "event_selection": "Tech Escape",
    "additional_notes": "Looking forward to the event!"
  }'
```

### Check Database Status
```bash
curl http://localhost:3000/api/init-db
```

## 🚨 Troubleshooting

### Form won't submit
- [ ] Check browser console for JavaScript errors
- [ ] Verify API endpoint `/api/register` is accessible
- [ ] Check environment variables are set
- [ ] Ensure database table exists in Supabase

### Data not appearing in database
- [ ] Verify Supabase RLS policies allow inserts
- [ ] Check service role key is correct
- [ ] Look at API response for error details
- [ ] Check Supabase SQL Editor for table

### Styling issues
- [ ] Clear browser cache
- [ ] Restart dev server
- [ ] Check Tailwind CSS build
- [ ] Verify shadcn/ui components installed

See **`REGISTRATION_SETUP.md`** for more troubleshooting tips.

## 📈 Next Steps (Optional Enhancements)

1. **Email Notifications** - Send confirmation emails
2. **Admin Dashboard** - View and export registrations
3. **Duplicate Prevention** - Block duplicate email registrations
4. **Ticket Generation** - Create PDF tickets with QR codes
5. **Payment Integration** - Collect registration fees
6. **Analytics** - Track registrations over time

## 📞 Support

- Check documentation files (*.md)
- Review browser console for errors
- Check Vercel deployment logs
- Check Supabase dashboard logs
- Review INTEGRATION_GUIDE.md for architecture details

## 📝 Changes Made

**New Pages:**
- `/register` - Registration page

**New Components:**
- `components/registration-form.tsx` - Registration form

**New API Endpoints:**
- `POST /api/register` - Submit registration
- `GET /api/init-db` - Check database status

**New Database:**
- `event_registrations` table with RLS policies

**Modified Files:**
- `app/page.tsx` - Updated register button to link to `/register`
- `package.json` - Added Supabase dependency

**Documentation:**
- `REGISTRATION_SETUP.md`
- `CHANGES.md`
- `INTEGRATION_GUIDE.md`
- `DEPLOYMENT_CHECKLIST.md`

## 🎯 How to Use

### For Participants
1. Go to FusionFest website home page
2. Click "Register Now" button
3. Fill out the registration form
4. Click "Complete Registration"
5. See confirmation message
6. Done! You're registered

### For Administrators
1. Go to Supabase dashboard
2. Navigate to Table Editor
3. Select `event_registrations` table
4. View all registrations
5. Export as CSV if needed
6. Send event details to registrations

## 📅 Event Date
**February 27, 2026** - CSE Department Block, RVCE

## 🏆 About FusionFest
FusionFest is the premier technical symposium organized by the Computer Science and Engineering department bringing together students, faculty, and industry professionals to celebrate innovation, creativity, and technological excellence.

---

**Version:** 1.0  
**Last Updated:** February 10, 2026  
**Maintained By:** FusionFest Team
