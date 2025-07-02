# Étape 1 : compilation avec le SDK
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copier la solution et le csproj
COPY ["DevApi.sln", "DevApi.csproj", "./"]

# Restaurer les dépendances
RUN dotnet restore "DevApi.csproj"

# Copier tout le reste et publier en Release
COPY . .
RUN dotnet publish "DevApi.csproj" -c Release -o /app/publish

# Étape 2 : image runtime légère
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app

# Récupérer les fichiers publiés
COPY --from=build /app/publish .

ENTRYPOINT ["dotnet", "bin/Debug/net9.0/DevApi.dll"]
