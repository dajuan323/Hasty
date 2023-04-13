USE [Hasty]
GO
/****** Object:  Table [dbo].[CivilianProfiles]    Script Date: 2/6/2023 1:47:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CivilianProfiles](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NOT NULL,
	[MonthlyIncome] [int] NULL,
	[MoveInDate] [datetime2](7) NULL,
	[DateModified] [datetime2](7) NOT NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_CivilianProfile] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[CivilianProfiles] ADD  CONSTRAINT [DF_CivilianProfiles_MoveInDate]  DEFAULT (getutcdate()) FOR [MoveInDate]
GO
ALTER TABLE [dbo].[CivilianProfiles] ADD  CONSTRAINT [DF_CivilianProfile_DateModified]  DEFAULT (getutcdate()) FOR [DateModified]
GO
ALTER TABLE [dbo].[CivilianProfiles] ADD  CONSTRAINT [DF_CivilianProfile_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO
ALTER TABLE [dbo].[CivilianProfiles]  WITH CHECK ADD  CONSTRAINT [FK_CivilianProfiles_Users] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[CivilianProfiles] CHECK CONSTRAINT [FK_CivilianProfiles_Users]
GO
