-- Query 1: Insert Tony Stark
INSERT INTO public.account (account_firstname, account_lastname, account_email, account_password)
VALUES ('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');

-- Query 2: Update Tony Stark to Admin
UPDATE public.account
SET account_type = 'Admin'
WHERE account_id = 1;

-- Query 3: Delete Tony Stark
DELETE FROM public.account
WHERE account_id = 1;

-- Query 4: Fix GM Hummer description
UPDATE public.inventory
SET inv_description = REPLACE(inv_description, 'small interiors', 'a huge interior')
WHERE inv_make = 'GM' AND inv_model = 'Hummer';

-- Query 5: Inner Join for Sport vehicles
SELECT inv_make, inv_model, classification_name
FROM public.inventory
INNER JOIN public.classification
ON public.inventory.classification_id = public.classification.classification_id
WHERE classification_name = 'Sport';

-- Query 6: Update image paths
UPDATE public.inventory
SET inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');
