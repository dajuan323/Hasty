USE [Hasty]
GO
/****** Object:  StoredProcedure [dbo].[CivilianProfiles_SelectAll]    Script Date: 2/6/2023 6:42:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Da'Juan Martin
-- Create date: 2/6/2023
-- Description: Select All (Paged) proc for CivilianProflles
-- Code Reviewer: Joshua Garcia

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer: 
-- Note:
-- =============================================

CREATE proc [dbo].[CivilianProfiles_SelectAll]
									@PageIndex int
									,@PageSize int


/* TEST CODE***********

		DECLARE @PageIndex int = 0
				,@PageSize int = 4

		EXECUTE dbo.CivilianProfiles_SelectAll
									@PageIndex
									,@PageSize

********************  */ 

as

BEGIN
		DECLARE @Offset INT = @PageIndex * @PageSize

		SELECT cp.Id
				,u.Id
				,u.FirstName
				,u.LastName
				,u.Mi	
				,u.AvatarUrl
				,cp.MonthlyIncome
				,cp.MoveInDate
				,cp.DateModified
				,TotalCount = COUNT(1) OVER()


			FROM [dbo].CivilianProfiles as cp
			INNER JOIN dbo.Users as u
				ON u.Id = cp.UserId
			ORDER BY cp.Id

			OFFSET @Offset ROWS
			FETCH NEXT @PageSize ROWS ONLY
END




GO
