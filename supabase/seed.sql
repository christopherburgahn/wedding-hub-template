insert into public.guests (
  first_name,
  last_name,
  email,
  attending,
  needs_accommodation,
  accommodation_notes,
  dietary_notes,
  travel_notes,
  song_request,
  payment_status,
  payment_amount
) values
  ('Taylor', 'River', null, true, true, 'Would like a family room if available', 'Vegetarian', 'Needs shuttle info', 'A favorite dance song', 'pending', 120.00),
  ('Jordan', 'Stone', null, false, false, null, null, null, null, 'not_needed', null)
on conflict do nothing;
