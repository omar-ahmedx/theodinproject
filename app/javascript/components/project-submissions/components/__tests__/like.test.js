import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import ProjectSubmissionContext from '../../ProjectSubmissionContext';
import Like from '../like';

describe('Like', () => {
  const renderLikeComponent = (userId = null, isLikedByUser = false, handleClick = () => {}) => {
    return render(
    )
  }

  test('Tells user to log in to like submission', () => {
    const { queryByLabelText, getByLabelText } = render(
      <ProjectSubmissionContext.Provider value={{ userId: null }}>
        <Like 
          submission={{ is_liked_by_current_user: false }} 
          handleLikeToggle={() => {}}
        />;
      </ProjectSubmissionContext.Provider>
    );
    
    const anchorNode = queryByLabelText('Log in to like!');
    const iconNode = getByLabelText('Like icon');

    expect(anchorNode).toBeTruthy();
    expect(iconNode).not.toHaveClass('liked');
  })

  test('Indicates user can like submission', () => {
    const { queryByLabelText, getByLabelText } = render(
      <ProjectSubmissionContext.Provider value={{ userId: 1 }}>
        <Like 
          submission={{ is_liked_by_current_user: false }} 
          handleLikeToggle={() => {}}
        />;
      </ProjectSubmissionContext.Provider>
    );

    const anchorNode = queryByLabelText('Like submission');
    const iconNode = getByLabelText('Like icon');

    expect(anchorNode).toBeTruthy();
    expect(iconNode).not.toHaveClass('liked');
  })


  test('Indicates user has liked submission', () => {
    const { queryByLabelText, getByLabelText } = render(
      <ProjectSubmissionContext.Provider value={{ userId: 1 }}>
        <Like 
          submission={{ is_liked_by_current_user: true }} 
          handleLikeToggle={() => {}}
        />;
      </ProjectSubmissionContext.Provider>
    );

    const anchorNode = queryByLabelText('Unlike submission');
    const iconNode = getByLabelText('Like icon');

    expect(anchorNode).toBeTruthy();
    expect(iconNode).toHaveClass('liked');
  })

  test('Calls toggle like handler when clicked', () => {
    const handleClick = jest.fn();
    const { getByLabelText } = render(
      <ProjectSubmissionContext.Provider value={{ userId: 1 }}>
        <Like 
          submission={{ is_liked_by_current_user: true }} 
          handleLikeToggle={handleClick}
        />;
      </ProjectSubmissionContext.Provider>
    );
    const anchorNode = getByLabelText(/like/);
    fireEvent.click(anchorNode);

    expect(handleClick).toHaveBeenCalledTimes(1);
  })

})