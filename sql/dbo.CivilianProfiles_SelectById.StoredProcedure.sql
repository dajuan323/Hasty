USE [Hasty]
GO
/****** Object:  StoredProcedure [dbo].[CivilianProfiles_SelectById]    Script Date: 2/6/2023 6:42:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Da'Juan Martin
-- Create date: 2/6/2023
-- Description: Select By Id proc for CivilianProflles
-- Code Reviewer: Joshua Garcia

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer: 
-- Note:
-- =============================================

CREATE proc [dbo].[CivilianProfiles_SelectById]
										@Id int



/* TEST CODE***********

		DECLARE @Id int = 17
			
		EXECUTE dbo.CivilianProfiles_SelectById @Id

********************  */ 

as

BEGIN

		SELECT cp.Id
				,u.Id
				,u.FirstName
				,u.LastName
				,u.Mi	
				,u.AvatarUrl
				,cp.MonthlyIncome
				,cp.MoveInDate
				,cp.DateModified


			FROM [dbo].CivilianProfiles as cp INNER JOIN dbo.Users as u
				ON u.Id = cp.UserId
			WHERE cp.Id = @Id

END




GO
