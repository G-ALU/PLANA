CREATE OR ALTER PROCEDURE loginUser
    @email VARCHAR(255)
AS
BEGIN
    SELECT email, password AS password, role, user_id, isActive
    FROM Users
    WHERE email = @email
END;