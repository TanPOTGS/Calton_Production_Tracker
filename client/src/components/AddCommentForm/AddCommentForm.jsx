import {
  useState,
  useEffect
} from 'react';
import {
  useSelector,
  useDispatch
} from 'react-redux';
import {
  addComment
} from '../../features/orders/orderSlice';
import {
  getUsers,
  reset
} from '../../features/users/userSlice';
import emailjs from '@emailjs/browser';
import { RiAddFill } from 'react-icons/ri'
import styled from 'styled-components';

function AddCommentForm(props) {
  const {
    closeModal,
    orderDataForModal,
    handleOrderNotesDisplay
  } = props

  const [formData, setFormData] = useState({
    _id: orderDataForModal._id,
    commentBody: '',
    userSearch: '',
    usersFound: false,
    commentRecipients: []
  })
  
  const {
    _id,
    commentBody,
    userSearch,
    usersFound,
    commentRecipients
  } = formData

  const dispatch = useDispatch()

  const {
    user
  } = useSelector((state) => state.auth)

  const {
    isSuccess
  } = useSelector((state) => state.orders)

  const {
    users,
    isError,
    message
  } = useSelector((state) => state.users)

  useEffect(() => {
    if (isError && user) {
      console.log(message);
      dispatch(reset())
    }

    dispatch(getUsers())
  }, [])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      usersFound: false,
      [e.target.name]: e.target.value
    }))
    
    // console.log(`Name: ${e.target.name} | Value: ${e.target.value}`)
  }

  const onSubmit = (e) => {
    e.preventDefault()

    let commentId;

    if(orderDataForModal.comments.length === 0) {
      commentId = 1
    } else {
      commentId = orderDataForModal.comments.length + 1
    }

    let recipientsEmails = []
    commentRecipients.map(r => recipientsEmails.push(r.email))

    const orderData = {
      _id,
      newComment: {
        commentId: commentId,
        body: commentBody,
        author: user.name,
        recipients: recipientsEmails
      }
    }

    dispatch(addComment(orderData))

    if(commentRecipients.length >= 1) {
      if(window.Email) {
        window.Email.send({
          Host : "smtp.elasticemail.com",
          Username : "production@caltoncases.com",
          Password : "E867D55A347745D0BF4642EB6CBEC48BD6AB",
          Port: 2525,
          To : recipientsEmails,
          From : user.email,
          Subject : "You were mentioned in a comment...",
          Body : commentBody
        }).then(
          message => alert(message)
        );
      }
    }

    if(isSuccess) {
      closeModal()
    }
  }
  
  return (
    <StyledFormContainer>
      <StyledFormHeader>
        <h1>
          <RiAddFill />
          Add Comment
        </h1>
      </StyledFormHeader>
      <StyledForm onSubmit={onSubmit}>
        <StyledSearchContainer>
          <StyledSearchLabel htmlFor="searchUsers">Notify someone:</StyledSearchLabel>
          <StyledDropdownContainer>
            <StyledSearchField 
              type="search" 
              name='userSearch'
              id='searchUsers'
              value={userSearch}
              placeholder="Search user..."
              onChange={onChange}
            />
            <StyledSearchFieldDropdown isVisible={usersFound ? "block" : "none"}>
              <StyledUserList>
                {users.filter((user) => {
                  if(userSearch === "") {
                    return null
                  } else if(userSearch !== '' && user.name.toLowerCase().startsWith(userSearch.toLowerCase())) {
                    return user
                  } else if(userSearch !== '' && !user.name.toLowerCase().startsWith(userSearch.toLowerCase())) {
                    return null
                  }
                }).map((user, key) => {
                  if(!usersFound) {
                    setFormData((prevState) => ({
                      ...prevState,
                      usersFound: true
                    }))
                  }
                  return (
                    <StyledUserName key={key} onClick={() => 
                      setFormData((prevState) => ({
                        ...prevState,
                        commentRecipients: [...prevState.commentRecipients, user]
                      }))
                    }>
                      {user.name}
                    </StyledUserName>
                  )
                })}
              </StyledUserList>
            </StyledSearchFieldDropdown>
          </StyledDropdownContainer>
        </StyledSearchContainer>
        <StyledUsersContainer>
          {commentRecipients.map((r, i) => {
            return (
              <StyledRecipient key={i}>
                <StyledRecipientName>{r.name}</StyledRecipientName>
                <StyledRecipientRemove onClick={() => 
                  setFormData((prevState) => ({
                    ...prevState,
                    commentRecipients: prevState.commentRecipients.filter((rr) => rr.name !== r.name)
                  }))
                }>
                  x
                </StyledRecipientRemove>
              </StyledRecipient>
            )
          })}
        </StyledUsersContainer>
        <StyledFormGroup>
          <StyledTextInput 
            type="text" 
            name='commentBody'
            id='commentBody'
            rows="30"
            cols="30"
            value={commentBody}
            onChange={onChange}
            // required
          />
          {/* <StyledFormSpan></StyledFormSpan> */}
          <StyledFormLabel htmlFor="commentBody">Comment</StyledFormLabel>
        </StyledFormGroup>
        <StyledFormButtonContainer>
          <StyledSubmitButton type='submit'>
            Add Note
          </StyledSubmitButton>
          <StyledCancelButton onClick={closeModal}>
            Cancel
          </StyledCancelButton>
        </StyledFormButtonContainer>
      </StyledForm>
    </StyledFormContainer>
  )
}

export default AddCommentForm

const StyledFormContainer = styled.section`
  background-color: #ffffff;
  border-radius: 10px;
  position: absolute;
  width: 50vw;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const StyledFormHeader = styled.div`
  display: flex;
  color: #000000;
  justify-content: center;
  padding: 20px 0;
  border-bottom: 1px solid #009879;
`

const StyledForm = styled.form`
  padding: 0 40px;
  box-sizing: border-box;
`

const StyledSearchContainer = styled.div`
  position: relative;
  display: flex;
  margin: 30px 0;
  padding: 0 5px;
`

const StyledDropdownContainer = styled.div`
  position: relative;
`

const StyledSearchFieldDropdown = styled.div`
  display: ${props => props.isVisible};
  background-color: #ffffff;
  left: 10px;
  z-index: 10;
  position: absolute;
  border: 1px solid #000000;
  height: 100px;
  width: 300px;
  overflow: auto;
  &::-webkit-scrollbar {
    width: .5vw;
    height: 1vh;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #88f7ba;
  }
  &::-webkit-scrollbar-track {
    background-color: #afafaf;
  }
  &::-webkit-scrollbar-corner {
    background-color: #afafaf;
  }
`

const StyledSearchField = styled.input`
  height: 30px;
  width: 300px;
  border: none;
  margin: 0 10px;
  border-bottom: 2px solid #afafaf;
  outline: none;
  font-size: 20px;
`

const StyledSearchLabel = styled.label`
  color: #009879;
  font-size: 20px;
  pointer-events: none;
`

const StyledUsersContainer = styled.div`
  position: relative;
  margin: 30px 0;
  padding: 0 5px;
  height: 150px;
  display: flex;
  align-items: flex-start;
`

const StyledRecipient = styled.div`
  display: flex;
  background-color: #e8e8e8;
  justify-content: center;
  align-items: center;
  padding: 5px;
  margin: 0 3px;
`

const StyledRecipientName = styled.p`
  font-size: 18px;
`

const StyledRecipientRemove = styled.span`
  cursor: pointer;
  margin: 0 5px;
  font-weight: 700;
`

const StyledUserList = styled.ul`
  list-style-type: none;
`

const StyledUserName = styled.li`
  margin: 10px 0;
  padding: 5px;
  font-weight: 700;
  &:hover {
    background-color: #e8e8e8;
  }
`

const StyledFormGroup = styled.div`
  position: relative;
  border-bottom: 2px solid #afafaf;
  margin 30px 0;
`

const StyledTextInput = styled.textarea`
  color: #000000;
  width: 100%;
  padding: 20px 5px 0 5px;
  height: 50px;
  font-size: 16px;
  border: none;
  background: none;
  outline: none;
  &:valid ~ label {
    top: -5px;
    color: #009879;
  }
`

const StyledFormLabel = styled.label`
  position: absolute;
  top: 50%;
  left: 5px;
  color: #000000;
  transform: translateY(-50%);
  font-size: 20px;
  pointer-events: none;
  transition: .4s;
`

const StyledFormButtonContainer = styled.div`
  display: flex;
  margin: 20px 0;
  padding: 0 20%;
`

const StyledSubmitButton = styled.button`
  margin: 0 10px;
  width: 100%;
  height: 50px;
  border: 1px solid #ffffff;
  background: #009879;
  border-radius: 25px;
  font-size: 18px;
  color: #e9f4fb;
  font-weight: 700;
  cursor: pointer;
  outline: none;
  &:hover {
    border-color: #009879;
    transition: .4s;
  }
`

const StyledCancelButton = styled.button`
  margin: 0 10px;
  width: 100%;
  height: 50px;
  border: 1px solid #ffffff;
  background: #000000;
  border-radius: 25px;
  font-size: 18px;
  color: #009879;
  font-weight: 700;
  cursor: pointer;
  outline: none;
  &:hover {
    border-color: #000000;
    transition: .4s;
  }
`