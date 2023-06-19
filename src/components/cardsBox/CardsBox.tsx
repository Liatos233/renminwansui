import { Card, List } from 'antd';
import style from './cardsBox.module.less';
import { useNavigate } from 'react-router-dom';

interface CardsBoxProps {
  folderName: string;
  cardsValue: {
    categoryName: string;
    books: Array<string>;
  }
}

const CardsBox: React.FC<CardsBoxProps> = ({ folderName, cardsValue }) => {
  console.log('cardsValue', cardsValue);
  const navigate = useNavigate();

  const onCardClick = (item: String) => {
    // console.log('item', item);
    // 将文件名以searchParams的形式传递给ReadBook组件
    // 将文件夹名以state的形式传递给ReadBook组件
    // 将类别名以state的形式传递给ReadBook组件
    navigate(`/readBook?bookName=${item}`, { state: { folderName: folderName, catagoryName: cardsValue.categoryName } });
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
        loading={cardsValue.books.length === 0}
        pagination={{ position: 'bottom', align: 'center' }}
        dataSource={cardsValue.books}
        renderItem={(item, index) => (
          <List.Item>
            <Card
              className={style.card}
              hoverable
              // title={index + 1}
              onClick={() => onCardClick(item)}
            >{item}</Card>
          </List.Item>
        )}
      />
    </div>
  )
}
export default CardsBox