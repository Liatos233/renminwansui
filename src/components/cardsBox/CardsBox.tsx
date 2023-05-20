import { Card, List } from 'antd';
import style from './cardsBox.module.less';

interface CardsBoxProps {
  cardsValue: {
    categoryName: string;
    books: Array<string>;
  }
}

const CardsBox: React.FC<CardsBoxProps> = ({ cardsValue }) => {
  // console.log('cardsValue', cardsValue);

  const onCardClick = (item: String) => {
    console.log('item', item);
  }

  return (
    <div>
      <h3>{cardsValue.categoryName}</h3>
      <List
        grid={{
          gutter: 16,
          xs: 2,
          sm: 4,
          md: 4,
          lg: 4,
          xl: 6,
          xxl: 6,
        }}
        pagination={{ position: 'bottom', align: 'center' }}
        dataSource={cardsValue.books}
        renderItem={(item, index) => (
          <List.Item>
            <Card
              className={style.card}
              hoverable
              title={index + 1}
              onClick={() => onCardClick(item)}
            >{item}</Card>
          </List.Item>
        )}
      />
    </div>
  )
}
export default CardsBox