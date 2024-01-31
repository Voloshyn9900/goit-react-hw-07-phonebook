import { useEffect } from 'react';
import { ButtonDel, List, ListItem } from './ContactList.styled';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContactById } from '../../redux/contactSlice';
import { fetchContacts } from '../../redux/operations';


export const ContactList = () => {
  const dispatch = useDispatch()
  const contacts = useSelector(state => state.account.contacts.items);
  const filter = useSelector(state => state.account.filter);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const filterContacts = contacts.filter(contact =>
    contact.name.toUpperCase().includes(filter.toUpperCase())
  );

  return (
    <>
      <List>
        {filterContacts.map(contact => (
          <ListItem key={contact.id}>
            {contact.name}: {contact.phone}
            <ButtonDel onClick={() => dispatch(deleteContactById(contact.id))}>
              Delete
            </ButtonDel>
          </ListItem>
        ))}
      </List>
    </>
  );
};
