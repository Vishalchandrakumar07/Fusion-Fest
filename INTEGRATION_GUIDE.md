# Registration System Integration Guide

## Architecture Overview

```
User Interface
    ↓
/register page (registration-form.tsx)
    ↓
Form Submission
    ↓
/api/register endpoint (route.ts)
    ↓
Supabase PostgreSQL Database
    ↓
event_registrations table
    ↓
Success/Error Response
    ↓
User Confirmation Screen
```

## Data Flow

### 1. User Visits `/register`
- Displays `RegisterPage` component
- Shows `RegistrationForm` component
- Form fields are pre-populated with event options from constants

### 2. User Fills Form
- Form uses React state to track input values
- Real-time validation as user types
- Dropdown selects filter options (Events, Departments, Years)

### 3. User Submits Form
- Form validation runs (required fields, email format)
- If validation fails → Show error message
- If validation passes → Send POST request to `/api/register`

### 4. API Processes Request
- Receives form data as JSON
- Validates required fields again (server-side)
- Creates Supabase client with service role key
- Inserts record into `event_registrations` table
- Returns success or error response

### 5. Database Stores Data
- New row inserted into `event_registrations` table
- Auto-generated id, created_at, updated_at timestamps
- Data persists and is accessible in Supabase dashboard

### 6. User Sees Confirmation
- If successful → Show success screen with checkmark
- If error → Show error message with details
- User can register another person or navigate away

## File Dependencies

```
app/
  page.tsx (imports Link to route /register)
  register/
    page.tsx (imports RegistrationForm, Navbar)
  api/
    register/
      route.ts (uses Supabase client, handles form submission)
    init-db/
      route.ts (checks database status)

components/
  registration-form.tsx (form UI, validation, submission)
  navbar.tsx (imported by register/page.tsx)
  ui/ (shadcn components: Button, Input, Label, etc.)

lib/
  init-db.ts (database utilities)

scripts/
  setup-registrations-table.sql (database migration)
```

## Database Operations

### Create Operation (INSERT)
```
User submits form
  ↓
POST /api/register
  ↓
INSERT INTO event_registrations (...)
VALUES (...)
  ↓
RETURNING * (returns created record)
  ↓
Return success response
```

### Read Operations (SELECT)
- Health check endpoint: `GET /api/init-db`
- Manual query in Supabase dashboard
- Future admin dashboard (if built)

## Error Handling

### Client-Side Validation
- Required fields check
- Email format validation
- Error messages displayed in Alert component

### Server-Side Validation
- Required fields check (redundant for security)
- Database insert error handling
- Detailed error logging

### Database Errors
- Table doesn't exist → User sees helpful message
- Permission denied → Service role key issue
- Connection error → Network or Supabase issue

## Security Features

1. **Row Level Security (RLS)**
   - `Allow public inserts` policy
   - Anyone can submit registrations
   - Production: Consider stricter policies

2. **Service Role Key**
   - Used only on server-side (API routes)
   - Never exposed to client
   - Has full database permissions

3. **Input Validation**
   - Client-side: UX feedback
   - Server-side: Security (prevents invalid data)
   - Database constraints: Data integrity

4. **CORS & Security**
   - API calls from same origin (no CORS issues)
   - Form data in POST body (not URL)
   - HTTPS in production

## Environment Variables Used

```
NEXT_PUBLIC_SUPABASE_URL
  ↓
Used in: Components, API routes
Purpose: Identify which Supabase project

NEXT_PUBLIC_SUPABASE_ANON_KEY
  ↓
Used in: Future features (if needed)
Purpose: Client-side Supabase access

SUPABASE_SERVICE_ROLE_KEY
  ↓
Used in: API routes only
Purpose: Server-side database access with full permissions
```

## Performance Optimizations

1. **Database Indexes**
   - idx_registrations_email (for lookups)
   - idx_registrations_created_at (for sorting)

2. **Form Optimization**
   - Client-side validation (fast feedback)
   - Minimal API calls (only on submit)
   - No unnecessary data fetching

3. **Component Structure**
   - Single form component (no fragmentation)
   - Minimal re-renders
   - Efficient state management

## Monitoring & Maintenance

### Check Database Status
```bash
curl http://localhost:3000/api/init-db
```

Response:
```json
{
  "status": "healthy",
  "registrationCount": 42,
  "timestamp": "2026-02-10T12:34:56.789Z"
}
```

### View Registrations
1. Supabase Dashboard → Table Editor
2. Select `event_registrations`
3. See all submitted data
4. Sort/filter as needed

### Monitor Errors
- Check Vercel deployment logs
- Look for `/api/register` errors
- Check Supabase dashboard for DB issues

## Future Enhancements

### Feature: Email Notifications
- Send confirmation email after registration
- Requires email service (SendGrid, Resend, etc.)
- Add email column tracking

### Feature: Duplicate Prevention
- Check if email already registered
- Show option to update instead of create
- Requires UPDATE policy in RLS

### Feature: Admin Dashboard
- Create `/admin/registrations` page
- Protected with authentication
- Show analytics and export options
- Delete/update registrations

### Feature: Ticket Generation
- Create QR code from registration ID
- Generate PDF ticket
- Send via email

### Feature: Payment Integration
- Add Stripe/Razorpay
- Track payment status
- Send receipt on successful payment

## Testing Checklist

- [ ] Form displays all fields correctly
- [ ] Validation works (empty fields, invalid email)
- [ ] Successful submission shows success screen
- [ ] Data appears in Supabase
- [ ] Mobile view is responsive
- [ ] Error messages are clear
- [ ] Navigation between pages works
- [ ] All dropdown options load correctly
- [ ] Textarea allows multiline input
- [ ] Success screen auto-dismisses after 5 seconds

## Troubleshooting Guide

### Form Won't Submit
- Check browser console for errors
- Verify API endpoint is accessible
- Check environment variables are set
- Ensure Supabase table exists

### Data Not Appearing in Database
- Check Supabase RLS policies
- Verify service role key is correct
- Check database table structure
- Look at API response for errors

### Page Looks Wrong
- Clear browser cache
- Check CSS/Tailwind build
- Verify all components imported
- Check for console errors

### Environment Variables Not Working
- Restart dev server
- Check Vercel project settings
- Verify variable names are exact
- Look at build logs

## Support Resources

- **Supabase Docs**: https://supabase.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Vercel Docs**: https://vercel.com/docs
- **React Docs**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com

## Questions & Answers

**Q: Can I change the event list?**
A: Yes, edit the `EVENTS` constant in `components/registration-form.tsx`

**Q: How do I export registrations?**
A: Use Supabase dashboard → Table Editor → Export as CSV

**Q: Can I add more fields?**
A: Yes, update the SQL migration, form component, and API route

**Q: How do I prevent duplicate emails?**
A: Add unique constraint to email column (requires migration)

**Q: Can users edit their registration?**
A: Not yet - would require authentication and update functionality

**Q: How do I send confirmation emails?**
A: Add email service integration (SendGrid, Resend, etc.)
