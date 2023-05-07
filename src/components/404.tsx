import { Button } from 'antd';
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
    const navigate = useNavigate();
    const goHome = () => {
        navigate('/');
    }

    return (
        <div>
            <Button type="primary" onClick={goHome}>返回首页</Button>
        </div>
    )
}
export default NotFound;