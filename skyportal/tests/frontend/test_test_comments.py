def test_test_comments(driver, user):
    driver.get(f'/become_user/{user.id}')
    driver.get('/test_comments)

    # Get the input field
    comment_input = driver.wait_for_xpath("//input[@data-testid='testCommentInput']")
    # Enter some comment text
    comment_input.send_keys("TEST_TEXT")
    # Click the submit button
    driver.click_xpath("//button[@data-testid='testCommentSubmitButton']")
    # Wait for the new comment to be displayed
    driver.wait_for_xpath("//li[text()='TEST_TEXT']")