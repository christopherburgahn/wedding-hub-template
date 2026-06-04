insert into public.guests (
  first_name,
  last_name,
  email,
  attending,
  dietary_notes,
  travel_notes,
  song_request
) values
  ('Taylor', 'River', null, true, 'Vegetarian', 'Needs shuttle info', 'A favorite dance song'),
  ('Jordan', 'Stone', null, false, null, null, null)
on conflict do nothing;
