import { useEffect } from 'react';
import { ButtonDel, List, ListItem } from './ContactList.styled';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact, fetchContacts } from '../../redux/operations';
import { selectVisiblContacts } from '../../redux/selectors';

export const ContactList = () => {
  const dispatch = useDispatch();

  const contacts = useSelector(selectVisiblContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <List>
        {contacts.map(contact => (
          <ListItem key={contact.id}>
            {contact.name}: {contact.phone}
            {console.log(contact.id)}
            <ButtonDel onClick={() => dispatch(deleteContact(contact.id))}>
              Delete
            </ButtonDel>
          </ListItem>
        ))}
      </List>
    </>
  );
};
