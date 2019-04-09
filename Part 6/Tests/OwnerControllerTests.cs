using AccountOwnerServer.Controllers;
using Contracts;
using Entities.Models;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using Xunit;


namespace Tests
{
    public class OwnerControllerTests
    {
        Mock<IRepositoryWrapper> _repoWrapperMock;
        Mock<IOwnerRepository> _ownerRepoMock;
        Mock<ILoggerManager> _loggerMock;

        public OwnerControllerTests()
        {
            _repoWrapperMock = new Mock<IRepositoryWrapper>();
            _ownerRepoMock = new Mock<IOwnerRepository>();
            _loggerMock = new Mock<ILoggerManager>();
        }

        [Fact]
        public void GetAllOwners_WhenCalled_ReturnsOkResult()
        {
            // Arrange
            _repoWrapperMock.Setup(x => x.Owner)
                  .Returns(_ownerRepoMock.Object);
            _ownerRepoMock.Setup(x => x.GetAllOwners())
                .Returns(new[] { new Owner() });

            var controller = new OwnerController(_loggerMock.Object, _repoWrapperMock.Object);

            // Act
            var response = controller.GetAllOwners();

            // Assert
            Assert.IsType<OkObjectResult>(response);
        }

        [Fact]
        public void GetAllOwners_WhenCalled_ReturnsAllItems()
        {
            // Arrange
            _repoWrapperMock.Setup(x => x.Owner)
                  .Returns(_ownerRepoMock.Object);
            _ownerRepoMock.Setup(x => x.GetAllOwners())
                .Returns(new[] { new Owner(), new Owner() });

            var controller = new OwnerController(_loggerMock.Object, _repoWrapperMock.Object);

            // Act
            var response = controller.GetAllOwners() as OkObjectResult;
            var items = response.Value as IEnumerable<Owner>;

            // Assert
            Assert.NotNull(items);
            Assert.Equal(2, items.Count());
        }

        [Fact]
        public void GetOwnerById_UnknownGuidPassed_ReturnsNotFoundResult()
        {
            // Arrange
            var unexistingGuid = Guid.NewGuid();
            _repoWrapperMock.Setup(x => x.Owner)
                  .Returns(_ownerRepoMock.Object);
            _ownerRepoMock.Setup(x => x.GetOwnerById(unexistingGuid))
                .Returns(new Owner());

            var controller = new OwnerController(_loggerMock.Object, _repoWrapperMock.Object);

            // Act
            var result = controller.GetOwnerById(unexistingGuid);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public void GetOwnerById_ExistingGuidPassed_ReturnsOkResult()
        {
            // Arrange
            var existingGuid = Guid.NewGuid();
            _repoWrapperMock.Setup(x => x.Owner)
                  .Returns(_ownerRepoMock.Object);
            _ownerRepoMock.Setup(x => x.GetOwnerById(existingGuid))
                .Returns(new Owner()
                {
                    Id = existingGuid,
                    Address = "test address",
                    Name = "test name",
                    DateOfBirth = DateTime.Now
                });

            var controller = new OwnerController(_loggerMock.Object, _repoWrapperMock.Object);

            // Act
            var result = controller.GetOwnerById(existingGuid);

            // Assert
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public void GetOwnerById_ExistingGuidPassed_ReturnsRightItem()
        {
            // Arrange
            var existingGuid = Guid.NewGuid();
            _repoWrapperMock.Setup(x => x.Owner)
                  .Returns(_ownerRepoMock.Object);
            _ownerRepoMock.Setup(x => x.GetOwnerById(existingGuid))
                .Returns(new Owner()
                {
                    Id = existingGuid,
                    Address = "test address",
                    Name = "test name",
                    DateOfBirth = DateTime.Now
                });

            var controller = new OwnerController(_loggerMock.Object, _repoWrapperMock.Object);

            // Act
            var response = controller.GetOwnerById(existingGuid) as OkObjectResult;
            var item = response.Value as Owner;
            // Assert
            Assert.Equal(existingGuid, item.Id);
        }
    }
}
