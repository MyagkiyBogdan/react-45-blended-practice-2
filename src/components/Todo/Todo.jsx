import { Text } from 'components';
import { TodoWrapper, DeleteButton, EditButton } from './Todo.styled';
import { RiDeleteBinLine, RiEdit2Line } from 'react-icons/ri';

export const Todo = ({ text, elementIndex, handleDelete, handleEdit }) => {
  return (
    <TodoWrapper>
      <Text textAlign="center" marginBottom="20px">
        TODO #{elementIndex}
      </Text>
      <Text>{text}</Text>
      <DeleteButton type="button" onClick={handleDelete}>
        <RiDeleteBinLine size={24} />
      </DeleteButton>
      <EditButton type="button" onClick={handleEdit}>
        <RiEdit2Line size={24} />
      </EditButton>
    </TodoWrapper>
  );
};
