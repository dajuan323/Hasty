USE [Hasty]
GO
/****** Object:  StoredProcedure [dbo].[CivilianProfiles_Delete]    Script Date: 2/6/2023 1:47:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Da'Juan Martin
-- Create date: 2/6/2023
-- Description: Delete proc for CivilianProflles
-- Code Reviewer: Joshua Garcia

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer: 
-- Note:
-- =============================================



CREATE proc [dbo].[CivilianProfiles_Delete]
			@Id int




/* -------- Test Code --------

	Declare @Id int = 14;

	Execute	dbo.CivilianProfiles_Delete
						@Id

	Select	*
	From	dbo.CivilianProfiles
	Where	Id = @Id

*/ -------- Test Code --------

as

BEGIN

	UPDATE		[dbo].[CivilianProfiles]

	SET			[IsDeleted] = 1

	WHERE		Id = @Id

END
GO
