# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

COPY *.sln .
COPY PROJET_HACKATON/*.csproj ./PROJET_HACKATON/
RUN dotnet restore

COPY . .
WORKDIR /app/PROJET_HACKATON
RUN dotnet publish -c Release -o /out

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /out .
ENTRYPOINT ["dotnet", "PROJET_HACKATON.dll"]
