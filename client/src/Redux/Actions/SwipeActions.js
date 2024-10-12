export const NEXT_RESTAURANT = 'NEXT_RESTAURANT';
export const PREVIOUS_RESTAURANT = 'PREVIOUS_RESTAURANT';

export const nextRestaurant = () => ({
  type: NEXT_RESTAURANT,
});

export const previousRestaurant = () => ({
  type: PREVIOUS_RESTAURANT,
});