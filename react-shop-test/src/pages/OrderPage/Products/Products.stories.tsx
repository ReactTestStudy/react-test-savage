/* eslint-disable */
import Products from './Products';

export default {
  title: "Products",
};

export const Default = () => <Products name='Korea' imagePath={'sample'} updateItemCount={((itemName, currentCount) => {})} />;

Default.story = {
  name: 'default',
};
