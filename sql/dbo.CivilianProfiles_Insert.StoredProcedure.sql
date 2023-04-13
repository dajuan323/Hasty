USE [Hasty]
GO
/****** Object:  StoredProcedure [dbo].[CivilianProfiles_Insert]    Script Date: 2/6/2023 1:47:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Da'Juan Martin
-- Create date: 2/6/2023
-- Description: Insert proc for CivilianProflles
-- Code Reviewer: Joshua Garcia

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer: 
-- Note:
-- =============================================

CREATE proc [dbo].[CivilianProfiles_Insert]
								@UserId int
								,@MonthlyIncome int
								,@MoveInDate datetime2(7)
								,@Id int OUTPUT



/* TEST CODE***********

		DECLARE @Id int = 0

		DECLARE @UserId int = 11
				,@MonthlyIncome int = 5000
				,@MoveInDate datetime2(7) = '11-30-2023'

		EXECUTE dbo.CivilianProfiles_Insert
									@UserId
									,@MonthlyIncome
									,@MoveInDate
									,@Id OUTPUT

		SELECT *
		FROM dbo.CivilianProfiles

********************  */ 

as

BEGIN




		
		INSERT INTO [dbo].[CivilianProfiles]
				   ([UserId]
				   ,[MonthlyIncome]
				   ,MoveInDate)

			 VALUES
				   (@UserId
				   ,@MonthlyIncome
				   ,@MoveInDate)

			SET @Id = SCOPE_IDENTITY()
    
END










GO
