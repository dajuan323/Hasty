USE [Hasty]
GO
/****** Object:  StoredProcedure [dbo].[CivilianProfiles_Update]    Script Date: 2/6/2023 1:47:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Da'Juan Martin
-- Create date: 2/6/2023
-- Description: Update proc for CivilianProflles
-- Code Reviewer: Joshua Garcia

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer: 
-- Note:
-- =============================================


CREATE proc [dbo].[CivilianProfiles_Update]
								@Id int
								,@UserId int
								,@MonthlyIncome int
								,@MoveInDate datetime2(7)
	
/*

	DECLARE @Id int = 2

	DECLARE	@UserId int = 5
			,@MonthlyIncome int = 12000
			,@MoveInDate datetime2(7) = '09-27-2023'

	SELECT *
	FROM dbo.CivilianProfiles
	WHERE Id = @Id

	EXECUTE dbo.CivilianProfiles_Update
								@Id
								,@UserId
								,@MonthlyIncome
								,@MoveInDate

	SELECT *
	FROM dbo.CivilianProfiles
	WHERE Id = @Id


*/

as

BEGIN

		UPDATE [dbo].[CivilianProfiles]
		   SET [UserId] = @UserId
			  ,[MonthlyIncome] = @MonthlyIncome
			  ,[MoveInDate] = @MoveInDate
			  ,[DateModified] = GETUTCDATE()
    
		 WHERE Id = @Id


 END


GO
